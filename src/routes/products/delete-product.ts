import { z } from "zod";
import type { FastifyPluginAsync } from "fastify";

import { deleteProduct } from "../../functions/products/delete-product";

const deleteProductParams = z.object({
  id: z.string(),
});

export const deleteProductRoute: FastifyPluginAsync = async (app) => {
  app.delete(
    "/products/:id",
    {
      schema: {
        params: deleteProductParams,
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };

      try {
        await deleteProduct(id);

        reply.status(200).send({ message: "Product deleted successfully" });
      } catch (error) {
        reply.status(404).send({ message: "Product not found" });
      }
    }
  );
};
