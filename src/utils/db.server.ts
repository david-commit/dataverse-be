// This checks if there is an existing database connection
// presrent before creating a new connection

import { PrismaClient } from '@prisma/client';

let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

if (!global.__db) {
  global.db = new PrismaClient()
}

db = global.__id;

export { db };
