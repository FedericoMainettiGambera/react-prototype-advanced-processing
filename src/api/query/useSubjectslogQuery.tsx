import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { axiosClient } from "../axios";

type SubjectslogInputRequest = {
  filters: {
    name1?: string;
    name2?: string;
  };
  pagination: {
    limit: number;
    offset: number;
  };
};

type User = {
  name1: string | null;
  name2: string | null;
  birthdate: string | null;
  gender: string | null;
};

type SubjectslogResponse = {
  items: User[];
  count: number;
};

const fetchFilteredSubjectslog = async (input: SubjectslogInputRequest) => {
  const body = {
    Name1: input.filters.name1,
    Name2: input.filters.name2,
    Limit: input.pagination.limit,
    Offset: input.pagination.offset,
  };
  const response = await axiosClient.post<SubjectslogResponse>("Subjectslog/GetFiteredSubjectslogWeb", body);

  return response.data;
};

export const useSubjectslogQuery = (input: SubjectslogInputRequest) => {
  const query = useQuery<SubjectslogResponse>({
    queryKey: ["subjectslogs", input],
    queryFn: () => fetchFilteredSubjectslog(input),
    select: data => ({
      items: data.items.map(i => ({
        name1: i.name1,
        name2: i.name2,
        birthdate: i.birthdate,
        gender: i.gender,
      })),
      count: data.count,
    }),
  });

  return query;
};

export const useSubjectslogTableState = (initialState?: SubjectslogInputRequest) => {
  const state = useState<SubjectslogInputRequest>(
    initialState || {
      filters: {
        name1: "",
        name2: "",
      },
      pagination: {
        limit: 300,
        offset: 0,
      },
    }
  );

  return state;
};
