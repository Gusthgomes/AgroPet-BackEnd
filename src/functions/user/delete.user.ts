import { db } from "../../db/prisma";

export async function deleteUser(id: string) {
  if (!id) {
    throw new Error("ID not found");
  }
  const result = await db.user.delete({
    where: { id },
  });

  if (!result) {
    throw new Error("User not found");
  }

  return { result };
}
