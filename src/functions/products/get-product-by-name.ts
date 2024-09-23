import { db } from "../../db/prisma";

export async function getProductByName(searchParams: string) {
  const result = await db.product.findFirst({
    where: {
      name: {
        contains: searchParams,
      },
    },
  });

  if (!result) {
    throw new Error("Product not found");
  }

  return {
    result,
  };
}
