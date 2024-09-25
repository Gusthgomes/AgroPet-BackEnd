import type { FastifyPluginAsync } from "fastify";

import { getUsers } from "../../functions/user/get-users";

export const getUsersRoute: FastifyPluginAsync = async (app) => {
  app.get("/users", async (_, reply) => {
    const result = await getUsers();

    reply.send(result);
  });
};
