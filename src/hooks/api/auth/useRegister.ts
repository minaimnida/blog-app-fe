"use client";

import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { Axios, AxiosError } from "axios";
import { toast } from "sonner";

const useRegister = () => {
  return useMutation({
    mutationFn: async (payload: Omit<User, "id">) => {
        const {data} = await axiosInstance.post("/auth/register", payload)
    },
    onSuccess: () => {
      toast.success("Register Success");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useRegister;
