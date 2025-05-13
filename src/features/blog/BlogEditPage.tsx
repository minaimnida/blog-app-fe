import EditBlogForm from "@/features/blog/components/EditBlogForm";
import React, { FC } from "react";

interface BlogEditPageProps {
  slug: string;
}
const BlogEditPage: FC<BlogEditPageProps> = ({ slug }) => {
  return (
    <div className="container mx-auto p-4">
      <EditBlogForm slug={slug} />
    </div>
  );
};

export default BlogEditPage;