"use client";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import type { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (payload: Pick<User, "email">) => {
      const { data } = await axiosInstance.post(
        "/auth/forgot-password",
        payload,
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Forgot Password Success");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useForgotPassword;