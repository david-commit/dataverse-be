import { db } from '../utils/db.server';

// =================================================================
//        GET: Count existing Admins
// =================================================================
export const countAdminService = async () => {
  return await db.admin.count();
};

// =================================================================
//        GET: Count existing Blogs
// =================================================================
export const countBlogService = async () => {
  return await db.blog.count();
};

// =================================================================
//        GET: Count existing Contact Entries
// =================================================================
export const countContactEntriesService = async () => {
  return await db.contactEntry.count();
};

// =================================================================
//        GET: Count existing Job Roles
// =================================================================
export const countJobService = async () => {
  return await db.job.count();
};
