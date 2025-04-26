"use client";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import type { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Response extends User {
  accesToken: string;
}
const useLogin = () => {
  const router = useRouter();
  const { onAuthSuccess } = useAuthStore();
  return useMutation({
    mutationFn: async (payload: Pick<User, "email" | "password">) => {
      const { data } = await axiosInstance.post<Response>(
        "/auth/login",
        payload,
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success("Login Success");
      onAuthSuccess({ user: data, accesToken: data.accesToken });
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useLogin;