import { db } from '../utils/db.server';

// =================================================================
//        GET: All Contact Entries
// =================================================================
export const getAllContactEntriesService = async () => {
  return await db.contactEntry.findMany({
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      subject: true,
      message: true,
    },
  });
};

// =================================================================
//        GET: Single Contact Entry
// =================================================================
export const getContactEntryService = async (contactEntryID: number) => {
  return await db.contactEntry.findUnique({
    where: {
      id: contactEntryID,
    },
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      subject: true,
      message: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// =================================================================
//        POST: New Contact Entry
// =================================================================
type NewContactEntryType = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

export const createContactEntryService = async (
  contactEntry: NewContactEntryType
) => {
  const { name, phone, email, subject, message } = contactEntry;

  return await db.contactEntry.create({
    data: {
      name,
      phone,
      email,
      subject,
      message,
    },
  });
};

// =================================================================
//        Delete: Existing Contact Entry
// =================================================================
export const deleteContactEntryService = async (contactEntryID: number) => {
  return await db.contactEntry.delete({
    where: {
      id: contactEntryID,
    },
  });
};
