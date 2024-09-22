import { db } from "../../db/prisma";

export async function getProducts() {
  const result = await db.product.findMany();

  if (!result) {
    throw new Error("Products not found");
  }

  return {
    result,
  };
}
