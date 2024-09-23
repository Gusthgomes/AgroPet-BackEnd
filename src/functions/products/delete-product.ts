import { db } from "../../db/prisma";

export async function deleteProduct(id: string) {
  const result = await db.product.delete({
    where: { id },
  });

  if (!result) {
    throw new Error("Product not found");
  }

  return {
    result,
  };
}
