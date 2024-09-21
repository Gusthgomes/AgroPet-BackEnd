import { db } from "../../db/prisma";

export async function UpdateCategory(id: string, name: string) {
  const result = await db.category.update({
    where: { id },
    data: { name },
  });

  if (!result) {
    throw new Error("Category not found");
  }

  return {
    result,
  };
}
