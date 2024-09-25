import fastifyJwt from "@fastify/jwt";
import type { FastifyPluginAsync, FastifyRequest, FastifyReply } from "fastify";

export const authPlugin: FastifyPluginAsync = async (app) => {
  app.register(fastifyJwt, {
    secret: "vhjksdvbsdkbvksdgvskdvbskgv235237851824g85cv8174vc9hb",
  });

  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );
};
