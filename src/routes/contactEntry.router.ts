// =================================================================
//        Router Config
// =================================================================
import express from 'express';
const router = express.Router();

// =================================================================
//        IMPORT: Contact Form db services
// =================================================================
import {
  getAllContactEntries,
  getContactEntry,
  createContactEntry,
  deleteContactEntry,
} from '../controllers/contactEntryController';

// =================================================================
//        GET: All Contact Entries
// =================================================================
router.get('/get-contact-entries', getAllContactEntries);

// =================================================================
//        GET: Single Contact Entry
// =================================================================
router.get('/get-contact-entries/:contactEntryID', getContactEntry);

// =================================================================
//        POST: New Contact Entry
// =================================================================
router.post('/create-contact-entry', createContactEntry);

// =================================================================
//        Delete: Existing Contact Entry
// =================================================================
router.post('/delete-contact-entry', deleteContactEntry);

module.exports = router;
