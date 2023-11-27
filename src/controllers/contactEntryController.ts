import type { Request, Response } from 'express';
import {
  getAllContactEntriesService,
  getContactEntryService,
  createContactEntryService,
  deleteContactEntryService,
} from '../services/contactEntry.services';

// =================================================================
//        GET: All Contact Entries
// =================================================================
export const getAllContactEntries = async (req: Request, res: Response) => {
  const contactEntry = await getAllContactEntriesService();

  if (!contactEntry) {
    return res.status(404).json({ msg: 'No contact entries found' });
  }
  return res.status(200).json(contactEntry);
};

// =================================================================
//        GET: Single Contact Entry
// =================================================================
export const getContactEntry = async (req: Request, res: Response) => {
  const { contactEntryID } = req.params;

  const contactEntry = await getContactEntryService(parseInt(contactEntryID));

  if (!contactEntry) {
    return res.status(400).json({ msg: 'Contact entry not found' });
  }
  return res.status(200).json(contactEntry);
};

// =================================================================
//        POST: New Contact Entry
// =================================================================
export const createContactEntry = async (req: Request, res: Response) => {
  const contactEntry = req.body;

  const entry = await createContactEntryService(contactEntry);

  if (!entry) {
    return res.status(422).json({ msg: 'Unprocessable entity' });
  }
  return res.status(200).json(entry);
};

// =================================================================
//        Delete: Exosting Contact Entry
// =================================================================
export const deleteContactEntry = async (req: Request, res: Response) => {
  const contactEntry = req.body;

  // Check if contact entry exists
  const contactEntryExists = await getContactEntryService(
    parseInt(contactEntry.id)
  );

  if (!contactEntryExists) {
    return res.status(404).json({ msg: 'Contact entry not found' });
  }

  // Proceed deleting since entry exists
  const entry = await deleteContactEntryService(contactEntry);

  if (!entry) {
    return res.status(500).json({ msg: 'Contact entry could not be deleted' });
  }
  return res.status(200).json({msg: 'Contact entry deleted successfully'});
};
