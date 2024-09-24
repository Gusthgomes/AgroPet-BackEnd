import { db } from "../../db/prisma";

export async function createUser(name: string, email: string) {
  try {
    const result = await db.user.create({
      data: {
        name,
        email,
      },
    });

    return { result };
  } catch (error) {
    throw new Error("Error creating user: " + String(error));
  }
}
