import type { FastifyPluginAsync } from "fastify";

import { getProducts } from "../../functions/products/get-products";

export const getProductsRoute: FastifyPluginAsync = async (app) => {
  app.get("/products", async (_, reply) => {
    const result = await getProducts();

    reply.send(result);
  });
};
