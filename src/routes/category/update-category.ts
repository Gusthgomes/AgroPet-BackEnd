import { z } from "zod";
import type { FastifyPluginAsync } from "fastify";
import { UpdateCategory } from "../../functions/category/update-category";

const UpdateCategorySchema = z.object({
  name: z.string().min(1).max(55),
});

export const updateCategoryRoute: FastifyPluginAsync = async (app) => {
  app.patch(
    "/category/:id",
    {
      schema: {
        body: UpdateCategorySchema,
        params: z.object({ id: z.string() }),
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const { name } = request.body as z.infer<typeof UpdateCategorySchema>;

      try {
        const updatedCategory = await UpdateCategory(id, name);

        reply.status(200).send(updatedCategory);
      } catch (error) {
        reply.status(400).send({ message: "Error updating category" });
      }
    }
  );
};
