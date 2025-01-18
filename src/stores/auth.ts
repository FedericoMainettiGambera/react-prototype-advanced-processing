import type { Subjectslog } from "@/api/types";
import { useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const subjectsLogAtom = atomWithStorage<Subjectslog | undefined>("subjects-log", undefined);

export const useAuth = () => {
  const subjectsLog = useAtomValue(subjectsLogAtom);

  return {
    subjectsLog,
    isSignedIn: Boolean(subjectsLog),
  };
};

export const useSetAuth = () => {
  const setSubjectsLog = useSetAtom(subjectsLogAtom);

  return setSubjectsLog;
};
