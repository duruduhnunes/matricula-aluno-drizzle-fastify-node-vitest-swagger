import { FastifyPluginAsync } from "fastify";
import { db } from "../client.ts";
import { courses } from "../schema.ts";
import { eq } from "drizzle-orm";



export const deleteCourses: FastifyPluginAsync = async (app) => {
   app.delete("/courses/:id", async (request, reply) => {
    const { id } = request.params as { id: string};

    if(!id){
        return reply.code(400).send({ message: "Please, Id is required"})
    }
    const [course] = await db.select().from(courses).where(eq(courses.id, id)).limit(1)
    if(!course){
        return reply.code(404).send({ message: "Course not found"})
    }
     await db.delete(courses).where(eq(courses.id, id)).returning()
   return reply.code(200).send({ message: "Course deleted sucessfully"})



   })
}