import { db } from "../../db/prisma";

export async function getCategoryByName(searchParams: string) {
  const result = await db.category.findFirst({
    where: {
      name: {
        contains: searchParams,
      },
    },
  });

  if (!result) {
    throw new Error("Category not found");
  }

  return {
    result,
  };
}
