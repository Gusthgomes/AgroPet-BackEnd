import { z } from "zod";
import type { FastifyPluginAsync } from "fastify";

import { getProductByName } from "../../functions/products/get-product-by-name";

const getProductSchema = z.object({
  name: z.string(),
});

export const getProductByNameRoute: FastifyPluginAsync = async (app) => {
  app.get(
    "/productsName",
    {
      schema: {
        querystring: getProductSchema,
      },
    },
    async (request, reply) => {
      const { name } = request.query as z.infer<typeof getProductSchema>;

      try {
        const category = await getProductByName(name);

        reply.status(200).send(category);
      } catch (error) {
        reply.status(404).send({ message: "Product not found" });
      }
    }
  );
};
