import { db } from '../src/utils/db.server';
import { hashPasswordService } from '../src/middlewares/bycrpt';
import {
  testAdminData,
  testCareerData,
  testBlogData,
  testContactFormData,
} from './seedData';

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
  slug: string;
  postedBy: string;
  published: boolean;
  deadline: string;
};

type BlogType = {
  blog_title: string;
  blog_description: string;
  blog_image: string;
  blog_details: string;
  slug: string;
  postedBy: string;
};

type ContactType = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

// ==== MAIN SEED FUNCTION ====
const seed = async () => {
  //======== > Seed Admins
  await Promise.all(
    testAdminData.map(async (admin: AdminType) => {
      // Hash plain password
      const hashedPassword = await hashPasswordService(admin.password);

      // Update profile with the hashed password
      return db.admin.create({
        data: {
          name: admin.name,
          email: admin.email,
          password: hashedPassword,
          phone: admin.phone,
        },
      });
    })
  );
  console.log('🌱 Admin data successfully seeded!');

  //======== > Seed Jobs
  await Promise.all(
    testCareerData.map((job: JobType) => {
      return db.job.create({
        data: {
          job_title: job.job_title,
          job_description: job.job_description,
          job_details: job.job_details,
          slug: job.slug,
          postedBy: job.postedBy,
          published: job.published,
          deadline: job.deadline,
        },
      });
    })
  );
  console.log('🌱 Job data successfully seeded!');

  //======== > Seed Blogs
  await Promise.all(
    testBlogData.map((blog: BlogType) => {
      return db.blog.create({
        data: {
          blog_title: blog.blog_title,
          blog_description: blog.blog_description,
          blog_image: blog.blog_image,
          blog_details: blog.blog_details,
          slug: blog.slug,
          postedBy: blog.postedBy,
        },
      });
    })
  );
  console.log('🌱 Blog data successfully seeded!');

  // ======== > Seed Contact Entries
  await Promise.all(
    testContactFormData.map((entry: ContactType) => {
      return db.contactEntry.create({
        data: {
          name: entry.name,
          phone: entry.phone,
          email: entry.email,
          subject: entry.subject,
          message: entry.message,
        },
      });
    })
  );
  console.log('🌱 Contact form data successfully seeded!');
};

// ======== > Run the seeding function
seed();
