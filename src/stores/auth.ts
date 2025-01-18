import type { Subjectslog } from "@/api/types";
import { atom, useAtomValue, useSetAtom } from "jotai";

export const subjectsLogAtom = atom<Subjectslog>();

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
