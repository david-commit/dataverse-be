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
} from '../controllers/contactEntryController';

// =================================================================
//        GET: All Contact Entries
// =================================================================
router.get('/get-contact-entries', getAllContactEntries);

// =================================================================
//        GET: Single Contact Entry
// =================================================================
router.get('/get-contact-entry/:contactEntryID', getContactEntry);

// =================================================================
//        POST: New Contact Entry
// =================================================================
router.post('/create-contact-entry', createContactEntry);

module.exports = router;
