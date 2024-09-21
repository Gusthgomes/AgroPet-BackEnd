import { z } from "zod";
import type { FastifyPluginAsync } from "fastify";
import { createCategory } from "../../functions/category/create-category";

const createCategorySchema = z.object({
  name: z.string(),
  description: z.string().min(1).max(70),
});

export const createCategoryRoute: FastifyPluginAsync = async (app) => {
  app.post(
    "/category",
    {
      schema: {
        body: createCategorySchema,
      },
    },
    async (request, reply) => {
      const { name, description } = request.body as z.infer<
        typeof createCategorySchema
      >;

      await createCategory({
        name,
        description,
      });

      reply.status(200).send({ message: "Category created successfully" });
    }
  );
};
