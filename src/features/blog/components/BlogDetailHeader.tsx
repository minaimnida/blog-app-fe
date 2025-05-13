import { Badge } from "@/components/ui/badge";
import ModalDeleteBlog from "@/features/blog/components/ModalDeleteBlog";
import useDeleteBlog from "@/hooks/api/blog/useDeleteBlog";
import { Blog } from "@/types/blog";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC } from "react";

interface BlogDetailHeaderProps {
  blog: Blog;
}
const BlogDetailHeader: FC<BlogDetailHeaderProps> = ({ blog }) => {
  const session = useSession();

  const { mutateAsync: deleteBlog, isPending } = useDeleteBlog();
  const handleDeleteBlog = async () => {
    await deleteBlog(blog.id);
  };
  return (
    <section className="mt-20 space-y-4">
      <Badge
        variant="outline"
        className="rounded-sm bg-green-100 text-green-600 capitalize"
      >
        {blog.category}
      </Badge>
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <div className="flex items-center justify-between">
        <p>
          {format(new Date(blog.createdAt), "dd MM yyyy")}- {blog.user?.name}
        </p>
        {Number(session.data?.user?.id) === blog.userId && (
          <ModalDeleteBlog isPending={isPending} onClick={handleDeleteBlog} />
        )}
      </div>
      <div className="relative h-[360px]">
        <Image
          src={blog.thumbnail}
          alt="thumbnail"
          className="rounded-sm object-cover"
          fill
        />
      </div>
    </section>
  );
};

export default BlogDetailHeader;