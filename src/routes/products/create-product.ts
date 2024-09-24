import { z } from "zod";
import type { FastifyPluginAsync } from "fastify";
import { CreateProduct } from "../../functions/products/create-product";

const CreateProductSchema = z.object({
  name: z.string().min(1).max(55),
  description: z.string().min(1).max(255).optional(),
  imageUrls: z.array(z.string()).min(1),
  basePrice: z.number().min(0),
  categoryId: z.string(),
  discountPercentage: z.number().min(0).max(100).default(0),
  userId: z.string().min(1).max(255),
});

export const createProductRoute: FastifyPluginAsync = async (app) => {
  app.post(
    "/product",
    {
      schema: {
        body: CreateProductSchema,
      },
    },
    async (request, reply) => {
      const {
        name,
        description,
        imageUrls,
        basePrice,
        categoryId,
        discountPercentage,
        userId,
      } = request.body as z.infer<typeof CreateProductSchema>;

      try {
        const newProduct = await CreateProduct(
          name,
          description ?? "",
          imageUrls,
          basePrice,
          categoryId,
          discountPercentage,
          userId
        );

        reply.status(200).send(newProduct);
      } catch (error) {
        reply.status(400).send({ message: "Error creating product", error });
      }
    }
  );
};
