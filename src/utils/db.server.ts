// =================================================================
// Instead of initializing PrismaClient on many points in the app
// and having multiple connections to the database, we create a
// checker to see if a PrismaClient already exists otherwise, will
// create a new one
// =================================================================

import { PrismaClient } from '@prisma/client';

let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

if (!global.__db) {
  global.__db = new PrismaClient();
}

db = global.__db;

export { db };
