import { z } from "zod";
import type { FastifyPluginAsync } from "fastify";
import { DeleteCategory } from "../../functions/category/delete-category";

const deleteCategoryParamsSchema = z.object({
  id: z.string(),
});

export const deleteCategoryRoute: FastifyPluginAsync = async (app) => {
  app.delete(
    "/category/:id",
    {
      schema: {
        params: deleteCategoryParamsSchema,
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };

      try {
        await DeleteCategory(id);

        reply.status(200).send({ message: "Category deleted successfully" });
      } catch (error) {
        reply.status(404).send({ message: "Category not found" });
      }
    }
  );
};
