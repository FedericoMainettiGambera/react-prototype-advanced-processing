import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { axiosClient } from "../axios";
import type { Subjectslog } from "../types";

type SubjectslogFilterRequest = {
  filters: {
    gender?: string;
    name1?: string;
    name2?: string;
    birthdate?: string;
  };
  pagination: {
    limit: number;
    offset: number;
  };
};

type SubjectslogResponse = {
  items: Pick<Subjectslog, "name1" | "name2" | "birthdate" | "gender">[];
  count: number;
};

const fetchFilteredSubjectslog = async (input: SubjectslogFilterRequest) => {
  const body = {
    Gender: input.filters.gender,
    Name1: input.filters.name1,
    Name2: input.filters.name2,
    Birthdate: input.filters.birthdate,
    Limit: input.pagination.limit,
    Offset: input.pagination.offset,
  };
  const response = await axiosClient.post<SubjectslogResponse>("Subjectslog/GetFiteredSubjectslogWeb", body);

  return response.data;
};

export const useSubjectslogQuery = (input: SubjectslogFilterRequest) => {
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

export const useSubjectslogTableState = (initialState?: SubjectslogFilterRequest) => {
  const state = useState<SubjectslogFilterRequest>(
    initialState || {
      filters: {
        gender: undefined,
        name1: undefined,
        name2: undefined,
        birthdate: undefined,
      },
      pagination: {
        limit: 10,
        offset: 0,
      },
    }
  );

  return state;
};
