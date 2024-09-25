import { z } from "zod";
import type { FastifyPluginAsync } from "fastify";
import { updateUser } from "../../functions/user/update-user";
import { UserRole } from "@prisma/client";

const UpdateUserSchema = z.object({
  name: z.string().min(1).max(55),
  email: z.string().email(),
  role: z.string().optional(),
});

export const updateUserRoute: FastifyPluginAsync = async (app) => {
  app.put(
    "/users/:id",
    {
      schema: {
        body: UpdateUserSchema,
        params: z.object({ id: z.string() }),
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const { name, email, role } = request.body as z.infer<
        typeof UpdateUserSchema
      >;

      try {
        const userRole = role ? (role as UserRole) : undefined;

        const updatedUser = await updateUser(id, name, email, userRole);
        reply.status(200).send(updatedUser);
      } catch (error: any) {
        if (error.message === "User not found") {
          reply.status(404).send({ message: error.message });
        } else {
          reply.status(400).send({ message: "Error updating user" });
        }
      }
    }
  );
};
