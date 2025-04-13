import { FastifyReply } from 'fastify';

export default async function handleErrors(fn: () => Promise<any>, reply: FastifyReply):Promise<boolean> {
try {
await fn();
return true;
} catch(e:any) {
    console.log("Error Handled", e)
    reply.code(500).send({
        statusCode: 500,
        message: "Internal Server Error",
        error: e.message
    });
    return false;
}
}