import { z } from "zod";
import type { FastifyPluginAsync } from "fastify";
import { UpdateAllCategory } from "../../functions/category/update-all-category";

const UpdateCategorySchema = z.object({
  name: z.string().min(1).max(55),
  description: z.string().min(1).max(55),
});

export const updateAllCategoryRoute: FastifyPluginAsync = async (app) => {
  app.put(
    "/categoryAll/:id",
    {
      schema: {
        body: UpdateCategorySchema,
        params: z.object({ id: z.string() }),
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const { name, description } = request.body as z.infer<
        typeof UpdateCategorySchema
      >;

      try {
        const updatedCategory = await UpdateAllCategory(id, name, description);
        reply.status(200).send(updatedCategory);
      } catch (error: any) {
        if (error.message === "Category not found") {
          reply.status(404).send({ message: error.message });
        } else {
          reply.status(400).send({ message: "Error updating category" });
        }
      }
    }
  );
};
