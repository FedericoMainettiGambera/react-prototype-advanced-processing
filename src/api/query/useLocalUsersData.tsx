import localUsersData from "./localUsersData.json";
import type { User } from "./useSubjectslogQuery";

export const useLocalUsersData = () => {
  return localUsersData as User[];
}