import { db } from "../../db/prisma";

export async function getCategoryByName(name: string) {
  const result = await db.category.findFirst({
    where: {
      name,
    },
  });

  if (!result) {
    throw new Error("Category not found");
  }

  return {
    result,
  };
}
