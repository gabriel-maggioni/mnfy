import fastify from "fastify";
import rateLimit from "@fastify/rate-limit";

import generateRandomID from "./utils/generateRandomID.js";
import validateOrigin from "./utils/validateOrigin.js";
import handleErrors from "./utils/handleErrors.js";
import NodeCache from "./utils/cache.js"
import DataBase from "./utils/db.js";

const cache = new NodeCache();
const db = new DataBase();

const app = fastify({logger: false});

await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
});

app.get("/all", async (request, reply) => {
await handleErrors(async()=>{
    const links = await db.getAll();
    return reply.code(200).send({
        statusCode: 200,
        message: "sucess",
        response: links
    });
}, reply);
});

app.post("/short", {preHandler: validateOrigin}, async (request, reply) => {

await handleErrors(async()=>{
    const { url } = request.body as { url: string };
    if (!url) return reply.status(400).send({ statusCode: 400, message: "Bad Request" });
    const id = generateRandomID();

    await db.create({id, url});
    return reply.send({ message: "Success", shortLink: id });
}, reply);

});

app.get("/:id", async (request, reply) => {

    await handleErrors(async()=>{
        const { id } = request.params as { id?: string };
        if (!id) return reply.status(400).send({ statusCode: 400, message: "Bad Request" });
    
        const cachedLink = cache.get(`${request.ip}:${id}`);
            if (cachedLink) return reply.code(200).send({ statusCode: 200, message: "Success", response: cachedLink });
    
            const updatedLink = await db.updateClicks(id);
            if (!updatedLink) return reply.status(400).send({ statusCode: 400, message: "Bad Request" });
    
            reply.code(200).send({ statusCode: 200, message: "Success", response: updatedLink });
            cache.set(`${request.ip}:${id}`, updatedLink);
            return;
    }, reply)
    
    });

let port:any = process?.env?.PORT && process.env.PORT || 3000;
app.listen({ port }, () => {
    console.log("App em execução na porta " + port);
});
