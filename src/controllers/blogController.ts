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
 
  try {
    const blogs = await getAllBlogsService();
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

// =================================================================
//        GET: Single Blog
// =================================================================
export const getBlog = async (req: Request, res: Response) => {
  const { blogID } = req.params;

  try {
    const blog = await getBlogService(parseInt(blogID));
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

// =================================================================
//        POST: New Blog
// =================================================================
export const createBlog = async (req: Request, res: Response) => {
  const blogPost = req.body;

  try {
    const blog = await createBlogService(blogPost);
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(422).json(error.message);
  }
};

// =================================================================
//        UPDATE: Existing Blog
// =================================================================
export const updateBlog = async (req: Request, res: Response) => {
  const blogPost = req.body;

  try {
    const blog = await updateBlogService(blogPost);
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(422).json(error.message);
  }
};
