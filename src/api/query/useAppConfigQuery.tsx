import { useAuth } from "@/stores/auth";
import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../axios";
import type { AppConfig } from "../types";

type AppConfigResponse = AppConfig;

const fetchAppConfig = async (subjectsLogId: string) => {
  if (subjectsLogId === "") {
    throw new Error("It isn't possible to load the app configuration without a subjectsLogId");
  }

  const response = await axiosClient.get(`AppconfigLog/Appconfig?subjectsLogId=${subjectsLogId}`);

  return response.data;
};

export const useAppConfigQuery = () => {
  const auth = useAuth();

  const query = useQuery<AppConfigResponse>({
    queryKey: ["appConfig", auth.subjectsLog?.id],
    queryFn: () => fetchAppConfig(auth.subjectsLog?.id || ""),
  });

  return query;
};
