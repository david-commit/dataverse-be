import type { Request, Response } from 'express';
import moment from 'moment';
import {
  getAllBlogsService,
  getBlogService,
  createBlogService,
  updateBlogService,
  deleteBlogService,
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
//        GET: Recent Blogs
// =================================================================
export const getRecentBlogs = async (req: Request, res: Response) => {
  const blogs = await getAllBlogsService();

  if (!blogs) {
    return res.status(404).json({ msg: 'No blogs found' });
  }

  const sortedBlogs = blogs.sort(
    (a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
  );

  // Return only the first three blogs (latest)
  const recentBlogs = sortedBlogs.slice(0, 3);
  return res.status(200).json(recentBlogs);
};

// =================================================================
//        GET: Single Blog
// =================================================================
export const getBlog = async (req: Request, res: Response) => {
  const { blogID } = req.params;

  const blog = await getBlogService(blogID);

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
  const { blogID } = req.params;
  const blogRole = req.body;

  // Check if blog exists
  const blogExists = await getBlogService(blogID);

  if (!blogExists) {
    return res.status(404).json({ msg: 'Blog not found' });
  }

  // Proceed updating since the blog exists
  const blog = await updateBlogService(blogRole);

  if (!blog) {
    return res.status(422).json({ msg: 'Insight blog could not be updated' });
  }
  return res.status(202).json(blog);
};

// =================================================================
//        Delete: Existing Blog
// =================================================================
export const deleteBlog = async (req: Request, res: Response) => {
  const { blogID } = req.params;

  // Check if blog exists
  const blogExists = await getBlogService(blogID);

  if (!blogExists) {
    return res.status(404).json({ msg: 'Blog not found' });
  }

  // Proceed deleting since the blog exists
  const blog = await deleteBlogService(parseInt(blogID));

  if (!blog) {
    return res.status(500).json({ msg: 'Insight blog could not be deleted' });
  }
  return res.status(204).json({ msg: 'Insight blog deleted successfully' });
};
