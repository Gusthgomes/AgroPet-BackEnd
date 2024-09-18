import { db } from "../../db/prisma";

interface CreateCategoryProps {
  name: string;
  description: string;
}

export async function createCategory({
  name,
  description,
}: CreateCategoryProps) {
  const result = await db.category.create({
    data: {
      name,
      description,
    },
  });

  return {
    result,
  };
}
