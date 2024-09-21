import { db } from "../../db/prisma";

export async function UpdateAllCategory(
  id: string,
  name: string,
  description: string
) {
  try {
    const result = await db.category.update({
      where: { id },
      data: {
        name,
        description,
      },
    });
    return { result };
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new Error("Category not found");
    }
    throw new Error("Error updating category");
  }
}
