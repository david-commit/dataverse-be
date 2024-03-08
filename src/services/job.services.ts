import { db } from '../utils/db.server';

// =================================================================
//        GET: All Jobs
// =================================================================
export const getAllJobsService = async () => {
  return await db.job.findMany({
    select: {
      id: true,
      job_title: true,
      job_description: true,
      slug: true,
      postedBy: true,
      createdAt: true,
    },
  });
};

// =================================================================
//        GET: Single Job
// =================================================================
export const getJobService = async (jobID: number) => {
  return await db.job.findUnique({
    where: {
      id: jobID,
    },
    select: {
      id: true,
      job_title: true,
      job_description: true,
      job_details: true,
      slug: true,
      postedBy: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// =================================================================
//        POST: New Job
// =================================================================
type NewJobType = {
  job_title: string;
  job_description: string;
  job_details: string;
  slug: string;
  postedBy: string;
  published: boolean;
  deadline: string;
};

export const createJobService = async (jobRole: NewJobType) => {
  const {
    job_title,
    job_description,
    job_details,
    slug,
    postedBy,
    published,
    deadline,
  } = jobRole;

  return await db.job.create({
    data: {
      job_title,
      job_description,
      job_details,
      slug,
      postedBy,
      published,
      deadline,
    },
  });
};

// =================================================================
//        UPDATE: Existing Job
// =================================================================
type JobUpdateType = {
  id: number;
  job_title: string;
  job_description: string;
  job_details: string;
  slug: string;
  postedBy: string;
};

export const updateJobService = async (jobRole: JobUpdateType) => {
  const { id, job_title, job_description, slug, job_details } = jobRole;

  return await db.job.update({
    where: {
      id: id,
    },
    data: {
      job_title,
      job_description,
      slug,
      job_details,
    },
  });
};

// =================================================================
//        Delete: Existing Job
// =================================================================

export const deleteJobService = async (jobID: number) => {
  return await db.job.delete({
    where: {
      id: jobID,
    },
  });
};
