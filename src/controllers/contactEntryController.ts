import type { Request, Response } from 'express';
import {
  getAllContactEntriesService,
  getContactEntryService,
  createContactEntryService,
} from '../services/contactEntry.services';

// =================================================================
//        GET: All Contact Entries
// =================================================================
export const getAllContactEntries = async (req: Request, res: Response) => {
  try {
    const contactEntry = await getAllContactEntriesService();
    return res.status(200).json(contactEntry);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

// =================================================================
//        GET: Single Contact Entry
// =================================================================
export const getContactEntry = async (req: Request, res: Response) => {
  const { contactEntryID } = req.params;

  try {
    const contactEntry = await getContactEntryService(parseInt(contactEntryID));
    return res.status(200).json(contactEntry);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

// =================================================================
//        POST: New Contact Entry
// =================================================================
export const createContactEntry = async (req: Request, res: Response) => {
  const contactEntry = req.body;

  try {
    const entry = await createContactEntryService(contactEntry);
    return res.status(200).json(entry);
  } catch (error) {
    return res.status(422).json(error.message);
  }
};

