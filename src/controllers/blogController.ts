import type { Request, Response } from 'express';
import {
  getAllBlogsService,
  getBlogService,
  createBlogService,
  updateBlogService,
} from '../services/blog.services';

// =================================================================
//        GET: All Blogs
// =================================================================
export const getAllBlogs = async (req: Request, res: Response) => {
  const blogs = await getAllBlogsService();

  if (!blogs) {
    return res.status(404).json({ msg: 'No blogs found' });
  }
  return res.status(200).json(blogs);
};

// =================================================================
//        GET: Single Blog
// =================================================================
export const getBlog = async (req: Request, res: Response) => {
  const { blogID } = req.params;

  const blog = await getBlogService(parseInt(blogID));

  if (!blog) {
    return res.status(404).json({ msg: 'Blog does not exist' });
  }

  return res.status(200).json(blog);
};

// =================================================================
//        POST: New Blog
// =================================================================
export const createBlog = async (req: Request, res: Response) => {
  const blogPost = req.body;

  const blog = await createBlogService(blogPost);

  if (!blog) {
    return res.status(422).json({ msg: 'Validation erors' });
  }
  return res.status(200).json(blog);
};

// =================================================================
//        UPDATE: Existing Blog
// =================================================================
export const updateBlog = async (req: Request, res: Response) => {
  const blogPost = req.body;

  // Check if blog exists
  const blogExists = await getBlogService(parseInt(blogPost.id));

  if (!blogExists) {
    return res.status(404).json({ msg: 'Blog not found'})
  }

  // Proceed updating since the blog exists
  const blog = await updateBlogService(blogPost);

  if (!blog) {
    return res.status(422).json({ msg: 'Unprosessable entity' });
  }
  return res.status(200).json(blog);
};
