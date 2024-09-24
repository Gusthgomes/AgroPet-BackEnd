import { db } from "../../db/prisma";
import { Decimal } from "@prisma/client/runtime/library";

export async function CreateProduct(
  name: string,
  description: string,
  imageUrls: string[],
  basePrice: number,
  categoryId: string,
  discountPercentage: number,
  userId: string
) {
  try {
    const result = await db.product.create({
      data: {
        name,
        description,
        imageUrls,
        basePrice: new Decimal(basePrice),
        categoryId,
        discountPercentage,
        userId,
      },
    });

    return result;
  } catch (error) {
    throw new Error("Error creating product: " + String(error));
  }
}
