import { PrismaClient } from "@prisma/client";
import { env } from "../env";

declare global {
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (env) {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
