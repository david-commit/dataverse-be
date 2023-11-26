import { db } from '../utils/db.server';

// =================================================================
//        GET: All Blogs
// =================================================================
export const getAllBlogsService = async () => {
  return await db.blog.findMany({
    select: {
      id: true,
      blog_title: true,
      blog_description: true,
      blog_image: true,
      slug: true,
      postedBy: true,
      createdAt: true,
    },
  });
};

// =================================================================
//        GET: Single Blog
// =================================================================
export const getBlogService = async (blogID: number) => {
  return await db.blog.findUnique({
    where: {
      id: blogID,
    },
    select: {
      id: true,
      blog_title: true,
      blog_description: true,
      blog_image: true,
      blog_details: true,
      slug: true,
      postedBy: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// =================================================================
//        POST: New Blog
// =================================================================
type NewBlogType = {
  blog_title: string;
  blog_description: string;
  blog_image: string;
  blog_details: string;
  slug: string,
  postedBy: string;
};

export const createBlogService = async (blogPost: NewBlogType) => {
  const { blog_title, blog_description, blog_image, blog_details, slug, postedBy } =
    blogPost;

  return await db.blog.create({
    data: {
      blog_title,
      blog_description,
      blog_image,
      blog_details,
      slug,
      postedBy,
    },
  });
};

// =================================================================
//        UPDATE: Existing Blog
// =================================================================
type UpdateBlogType = {
  id: number;
  blog_title: string;
  blog_description: string;
  blog_image: string;
  blog_details: string;
  slug: string;
  postedBy: string;
};

export const updateBlogService = async (blogPost: UpdateBlogType) => {
  const { id, blog_title, blog_description, blog_image, slug, blog_details } =
    blogPost;

  return await db.blog.update({
    where: {
      id: id,
    },
    data: {
      blog_title,
      blog_description,
      blog_image,
      slug,
      blog_details,
    },
  });
};
