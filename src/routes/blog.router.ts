// =================================================================
//        Router Config
// =================================================================
import express from 'express';
const router = express.Router();

// =================================================================
//        IMPORT: Blog db services
// =================================================================
import {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController';

// =================================================================
//        GET: All Blogs
// =================================================================
router.get('/get-blogs', getAllBlogs);

// =================================================================
//        GET: Single Blogs
// =================================================================
router.get('/get-blogs/:blogID', getBlog);

// =================================================================
//        POST: New Blogs
// =================================================================
router.post('/create-blog', createBlog);

// =================================================================
//        UPDATE: Existing Blog
// =================================================================
router.put('/create-blog', updateBlog);

// =================================================================
//        Delete: Existing Blog
// =================================================================
router.put('/delete-blog/:blogID', deleteBlog);

module.exports = router;
