import type { Request, Response } from 'express';
import {
  countAdminService,
  countBlogService,
  countContactEntriesService,
  countJobService,
} from '../services/dashboard.services';

// =================================================================
//        GET: Count existing Admins, Blogs, Contact Entries & Jobs
// =================================================================
export const countAllModels = async (req: Request, res: Response) => {
  const countAdmins = await countAdminService();
  const countBlogs = await countBlogService();
  const countContactEntries = await countContactEntriesService();
  const countJobs = await countJobService();

  const responseCountPayload = {
    admins: { count: countAdmins, title: 'Admins' },
    blogs: { count: countBlogs, title: 'Blogs' },
    contactEntries: { count: countContactEntries, title: 'Contact Entries' },
    jobs: { count: countJobs, title: 'Jobs' },
  };

  if (!responseCountPayload) {
    return res.status(500).json({ msg: 'Server count error' });
  }

  return res.status(200).json(responseCountPayload);
};
