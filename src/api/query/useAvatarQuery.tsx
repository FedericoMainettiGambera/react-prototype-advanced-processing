import { useAuth } from "@/stores/auth";
import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../axios";

type AvatarResponse = string;

const fetchAvatar = async (subjectsLogId: string) => {
  if (subjectsLogId === "") {
    throw new Error("It isn't possible to load the avatar without a subjectsLogId");
  }

  const response = await axiosClient.get(`Subjectslog/ImageBase64?id=${subjectsLogId}`);

  console.log(JSON.stringify(response, null, 2));

  return response.data;
};

export const useAvatarQuery = () => {
  const auth = useAuth();

  const query = useQuery<AvatarResponse>({
    queryKey: ["avatar", auth.subjectsLog?.id],
    queryFn: () => fetchAvatar(auth.subjectsLog?.id || ""),
  });

  return query;
};
