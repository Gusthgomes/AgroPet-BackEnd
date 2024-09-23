import { z } from "zod";
import type { FastifyPluginAsync } from "fastify";

import { updateProduct } from "../../functions/products/update-product";

const UpdateProductSchema = z.object({
  name: z.string().min(1).max(55),
  description: z.string().min(1).max(55),
});

export const updateProductRoute: FastifyPluginAsync = async (app) => {
  app.put(
    "/products/:id",
    {
      schema: {
        body: UpdateProductSchema,
        params: z.object({ id: z.string() }),
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const { name, description } = request.body as z.infer<
        typeof UpdateProductSchema
      >;

      try {
        const updatedProduct = await updateProduct(id, name, description);
        reply.status(200).send(updatedProduct);
      } catch (error: any) {
        if (error.message === "Product not found") {
          reply.status(404).send({ message: error.message });
        } else {
          reply.status(400).send({ message: "Error updating product" });
        }
      }
    }
  );
};
