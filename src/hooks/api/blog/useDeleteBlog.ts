"use client";
import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useDeleteBlog = () => {
  const router = useRouter();
  const queryCLient = useQueryClient();
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.delete(`/blogs/${id}`);
      return data;
    },
    onSuccess: async () => {
      toast.success("Delete blog success");
      await queryCLient.invalidateQueries({ queryKey: ["blogs"] });
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useDeleteBlog;