"use client";
import PaginationSection from "@/components/PaginationSection";
import { Input } from "@/components/ui/input";
import BlogCard from "@/features/home/components/BlogCard";
import useGetBlogs from "@/hooks/api/blog/useGetBlogs";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";

import { parseAsInteger, useQueryState } from "nuqs";

const BlogList = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });

  const [debounchedSearch] = useDebounceValue(search, 500);
  const { data: blogs, isPending } = useGetBlogs({
    page,
    take: 3,
    search: debounchedSearch,
  });

  const onChangePage = (page: number) => {
    setPage(page);
  };
  return (
    <>
      <Input
        className="mx-auto mt-10 max-w-xl"
        placeholder="Search...."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />
      {isPending && (
        <div className="flex h-[30vh] items-center justify-center">
          <Loader />
        </div>
      )}

      {!isPending && !blogs?.data.length && (
        <div className="flex h-[30vh] items-center justify-center">
          <h2>No Data</h2>
        </div>
      )}

      {!!blogs && !!blogs.data.length && (
        <div className="space-y-8">
          <section className="mt-10 grid grid-cols-3 gap-8">
            {blogs.data.map((blog) => {
              return <BlogCard key={blog.id} blog={blog} />;
            })}
          </section>
          <PaginationSection
            page={blogs.meta.page}
            total={blogs.meta.total}
            take={blogs.meta.take}
            onChangePage={onChangePage}
          />
        </div>
      )}
    </>
  );
};

export default BlogList;