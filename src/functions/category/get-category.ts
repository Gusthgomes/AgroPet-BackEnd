import { db } from "../../db/prisma";

export async function getCategory() {
  const result = await db.category.findMany();

  if (!result) {
    throw new Error("Category not found");
  }

  return {
    result,
  };
}
