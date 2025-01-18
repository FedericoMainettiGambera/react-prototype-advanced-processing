import { env } from "@/env/client";
import { useSetAuth } from "@/stores/auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { Subjectslog } from "../types";

const axiosClient = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

type SignInCredentials = {
  email: string;
  password: string;
};

type SignInResponse =
  | {
      success: true;
      subjectslog: Subjectslog;
    }
  | {
      errorType: number;
      success: false;
      message: string;
    };

export const signIn = async (credentials: SignInCredentials): Promise<SignInResponse> => {
  const response = await axiosClient.post<SignInResponse>("Subjectslog/LoginWeb", credentials);

  return response.data;
};

export const useSignInMutation = () => {
  const setAuth = useSetAuth();

  const mutation = useMutation<SignInResponse, Error, SignInCredentials>({
    mutationFn: signIn,
    onSuccess: data => {
      if (!data.success) {
        // this API treats errors as success resposne with { success: false }
        // so we manually throw an error so that React Query treats it as an error
        // (make mutation.isError and mutation.error work)
        throw new Error(data.message || "An error occurred during sign-in");
      }

      setAuth(data.subjectslog);
    },
  });

  return mutation;
};
