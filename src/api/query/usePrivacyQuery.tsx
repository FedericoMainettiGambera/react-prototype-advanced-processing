import { useAuth } from "@/stores/auth";
import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../axios";
import type { Privacy } from "../types";

type PrivacyResponse = Privacy;

const fetchPrivacy = async (subjectsLogId: string) => {
  if (subjectsLogId === "") {
    throw new Error("It isn't possible to load the privacy without a subjectsLogId");
  }

  const response = await axiosClient.get(`Subjectslog/PrivacyItems?id=${subjectsLogId}&ontologiesid=2901`);

  return response.data;
};

export const usePrivacyQuery = () => {
  const auth = useAuth();

  const query = useQuery<PrivacyResponse>({
    queryKey: ["privacy", auth.subjectsLog?.id],
    queryFn: () => fetchPrivacy(auth.subjectsLog?.id || ""),
  });

  return query;
};
