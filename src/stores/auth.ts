import type { Subjectslog } from "@/api/types";
import { useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const subjectsLogAtom = atomWithStorage<Subjectslog | undefined | null>("subjects-log", null);

export const useAuth = () => {
  const subjectsLog = useAtomValue(subjectsLogAtom);

  return {
    subjectsLog,
    isLoaded: subjectsLog !== null,
    isSignedIn: Boolean(subjectsLog),
  };
};

export type AuthContext = ReturnType<typeof useAuth>;

export const useSetSubjectsLog = () => {
  const setSubjectsLog = useSetAtom(subjectsLogAtom);

  return setSubjectsLog;
};
