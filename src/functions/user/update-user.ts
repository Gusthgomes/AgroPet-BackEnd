import { db } from "../../db/prisma";
import { UserRole } from "@prisma/client";

export async function updateUser(
  id: string,
  name: string,
  email: string,
  role: UserRole | undefined
) {
  try {
    const result = await db.user.update({
      where: { id },
      data: {
        name,
        email,
        role,
      },
    });
    return { result };
  } catch (error: any | string) {
    if (error.code === "P2025") {
      throw new Error("User not found");
    }
    throw new Error("Error updating user");
  }
}
