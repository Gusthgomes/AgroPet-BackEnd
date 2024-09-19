import { z } from "zod";
import type { FastifyPluginAsync } from "fastify";
import { getCategoryByName } from "../../functions/category/get-category-by-name";

const getCategorySchema = z.object({
  name: z.string(),
});

export const getCategoryByNameRoute: FastifyPluginAsync = async (app) => {
  app.get(
    "/categoryName",
    {
      schema: {
        querystring: getCategorySchema,
      },
    },
    async (request, reply) => {
      const { name } = request.query as z.infer<typeof getCategorySchema>;

      try {
        const category = await getCategoryByName(name);

        reply.status(200).send(category);
      } catch (error) {
        reply.status(404).send({ message: "Category not found" });
      }
    }
  );
};
