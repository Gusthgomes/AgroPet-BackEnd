import { z } from "zod";
import type { FastifyPluginAsync } from "fastify";

import { deleteUser } from "../../functions/user/delete.user";

const deleteProductParams = z.object({
  id: z.string(),
});

export const deleteUserRoute: FastifyPluginAsync = async (app) => {
  app.delete(
    "/users/:id",
    {
      schema: {
        params: deleteProductParams,
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };

      try {
        await deleteUser(id);

        reply.status(200).send({ message: "User deleted successfully" });
      } catch (error) {
        reply.status(404).send({ message: "User not found" });
      }
    }
  );
};
