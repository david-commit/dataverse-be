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
  try {
    const jobs = await getAllJobsService();
    return res.status(200).json(jobs);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

// =================================================================
//        GET: Single Job
// =================================================================
export const getJob = async (req: Request, res: Response) => {
  const { jobID } = req.params;

  try {
    const job = await getJobService(parseInt(jobID));
    return res.status(200).json(job);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

// =================================================================
//        POST: New Job
// =================================================================
export const createJob = async (req: Request, res: Response) => {
  const jobRole = req.body;

  try {
    const job = await createJobService(jobRole);
    return res.status(200).json(job);
  } catch (error) {
    return res.status(422).json(error.message);
  }
};

// =================================================================
//        UPDATE: Existing Job
// =================================================================
export const updateJob = async (req: Request, res: Response) => {
  const jobRole = req.body;

  try {
    const job = await updateJobService(jobRole);
    return res.status(200).json(job);
  } catch (error) {
    return res.status(422).json(error.message);
  }
};
