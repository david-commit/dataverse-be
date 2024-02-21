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
  updateReadContactEntry,
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
router.delete('/delete-contact-entry/:contactEntryID', deleteContactEntry);

// =================================================================
//        PATCH: Update Existing Contact Entry Read Value
// =================================================================
router.patch('/update-contact-entry/:contactEntryID', updateReadContactEntry);

module.exports = router;
