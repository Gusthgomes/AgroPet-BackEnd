import { db } from "../../db/prisma";

export async function getUsers() {
  const result = await db.user.findMany({});

  if (!result) {
    throw new Error("No users found");
  }

  return { result };
}
