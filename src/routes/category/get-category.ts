import type { FastifyPluginAsync } from "fastify";

import { getCategory } from "../../functions/category/get-category";

export const getCategoryRoute: FastifyPluginAsync = async (app) => {
  app.get("/category", async (_, reply) => {
    const result = await getCategory();

    reply.send(result);
  });
};
