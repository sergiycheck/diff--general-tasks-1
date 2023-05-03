import Fastify from "fastify";
import cors from "@fastify/cors";
import {
  UserLogin,
  findByEmailAndPass,
  findByEmailAndPassVulnerable,
  getAll,
} from "./lib/users";

const fastify = Fastify({
  logger: true,
});

fastify.register(cors);

fastify.get("/users", async (request, reply) => {
  const result = await getAll();
  return result;
});

fastify.post("/users/login", async (request, reply) => {
  const body = request.body as UserLogin;
  const result = await findByEmailAndPass(body);
  return result;
});

fastify.post("/users/login-vulnerable", async (request, reply) => {
  const body = request.body as UserLogin;
  const result = await findByEmailAndPassVulnerable(body);
  return result;
});

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3500 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
