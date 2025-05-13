"use client";

import { axiosInstance } from "@/lib/axios";
import type { Blog } from "@/types/blog";
import type { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetblogsQuery extends PaginationQueries {
  search?: string;
}
const useGetBlogs = (queries?: GetblogsQuery) => {
  return useQuery({
    queryKey: ["blogs", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Blog>>(
        "/blogs",
        { params: queries },
      );
      return data;
    },
  });
};
export default useGetBlogs;