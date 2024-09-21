import { db } from "../../db/prisma";

export async function DeleteCategory(id: string) {
  const result = await db.category.delete({
    where: { id },
  });

  if (!result) {
    throw new Error("Category not found");
  }

  return {
    result,
  };
}
