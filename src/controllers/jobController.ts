import type { Request, Response } from 'express';
import {
  getAllJobsService,
  getJobService,
  createJobService,
  updateJobService,
} from '../services/job.services';

// =================================================================
//        GET: All Jobs
// =================================================================
export const getAllJobs = async (req: Request, res: Response) => {
  const jobs = await getAllJobsService();

  if (!jobs) {
    return res.status(404).json({ msg: 'No role open found' });
  }
  return res.status(200).json(jobs);
};

// =================================================================
//        GET: Single Job
// =================================================================
export const getJob = async (req: Request, res: Response) => {
  const { jobID } = req.params;

  const job = await getJobService(parseInt(jobID));
  if (!job) {
    return res.status(404).json({ msg: 'Role not found' });
  }
  return res.status(200).json(job);
};

// =================================================================
//        POST: New Job
// =================================================================
export const createJob = async (req: Request, res: Response) => {
  const jobRole = req.body;

  const job = await createJobService(jobRole);

  if (!job) {
    return res.status(422).json({ msg: 'Unprocessable entity' });
  }
  return res.status(200).json(job);
};

// =================================================================
//        UPDATE: Existing Job
// =================================================================
export const updateJob = async (req: Request, res: Response) => {
  const jobRole = req.body;

  // Check if job exists
  const jobExists = await getJobService(parseInt(jobRole.id));

  if (!jobExists) {
    return res.status(404).json({ msg: 'Role does not exist' });
  }

  // Proceed updating if role exists
  const job = await updateJobService(jobRole);

  if (!job) {
    return res.status(422).json({ msg: 'Unprocessable entiy' });
  }
  return res.status(200).json(job);
};
