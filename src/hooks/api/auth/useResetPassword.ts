"use client";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import type { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useResetPassword = (token: string) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: Pick<User, "password">) => {
      const { data } = await axiosInstance.patch(
        "/auth/reset-password",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Reset Password Success");
      router.push("/login");
    },
    onError: (error: AxiosError<any>) => {
      console.log(error);
      toast.error(error.response?.data.message);
    },
  });
};

export default useResetPassword;