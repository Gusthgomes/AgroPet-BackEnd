import { db } from "../../db/prisma";

export async function updateProduct(
  id: string,
  name: string,
  description: string
) {
  try {
    const result = await db.product.update({
      where: { id },
      data: {
        name,
        description,
      },
    });
    return { result };
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new Error("product not found");
    }
    throw new Error("Error updating product");
  }
}
