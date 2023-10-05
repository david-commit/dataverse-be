// This checks if there is an existing database connection
// presrent before creating a new connection

import { PrismaClient } from '@prisma/client';

let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

db = global.__id;

export { db };
