import { db } from '../src/utils/db.server';
import { testAdminData, testCareerData, testBlogData } from './seedData';

type AdminType = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

type JobType = {
  job_title: string;
  job_description: string;
  job_details: string;
  postedBy: string;
};

type BlogType = {
  blog_title: string;
  blog_description: string;
  blog_image: string;
  blog_details: string;
  postedBy: string;
};

// ==== MAIN SEED FUNCTION ====
const seed = async () => {
  //==> Seed Admins
  await Promise.all(
    testAdminData.map((admin: AdminType) => {
      return db.admin.create({
        data: {
          name: admin.name,
          email: admin.email,
          password: admin.password,
          phone: admin.phone,
        },
      });
    })
  );

  //==> Seed Jobs
  await Promise.all(
    testCareerData.map((job: JobType) => {
      return db.job.create({
        data: {
          job_title: job.job_title,
          job_description: job.job_description,
          job_details: job.job_details,
          postedBy: job.postedBy,
        },
      });
    })
  );

  //==> Seed Blogs
  await Promise.all(
    testBlogData.map((blog: BlogType) => {
      return db.blog.create({
        data: {
          blog_title: blog.blog_title,
          blog_description: blog.blog_description,
          blog_image: blog.blog_image,
          blog_details: blog.blog_details,
          postedBy: blog.postedBy,
        },
      });
    })
  );
};

seed();
