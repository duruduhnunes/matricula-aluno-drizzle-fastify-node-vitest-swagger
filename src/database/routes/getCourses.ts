import z from "zod";
import { db } from "../client.ts";
import { courses, enrollments, users } from "../schema.ts";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { and, asc, count, desc, eq, ilike, SQL } from "drizzle-orm";


export const getCourses: FastifyPluginAsyncZod = async (app) => {
    app.get("/courses", {
        schema: {
            tags: ["Courses"],
            summary: "Get all courses",
            querystring: z.object({
                search: z.string().optional(),
                orderBy: z.enum(['id','title']).optional().default('id'), //or title
                page: z.coerce.number().optional().default(1) //coerce to convert string to number, a parte da paginação
            }),
            description: "This endpoint retrieves all courses from the database.",
            response: {
                200: z.object({
                    courses: z.array(
                        z.object({
                            id: z.string().uuid(),
                            title: z.string(),
                            description: z.string(),
                            enrollments: z.number(),
                        })
                    ),
                    total: z.number(),
                }),
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', description: 'Bad request' },
                    },
                }
            },
        }
    }, async (request, replay) => {
        const {search, orderBy, page} = request.query;

        const conditions: SQL[] | undefined = [ ]
        if(search){
            conditions.push(ilike(courses.title, `%${search}%`)) //o ilike é usado para fazer a busca sem case sensitive, o % é usado para buscar qualquer coisa antes ou depois do termo buscado
        }
        
       const [result, total] =  await Promise.all([ //como eu tenho duas consultas que são independentes, eu uso o promise.all para fazer as duas consultas ao mesmo tempo e crio um array com o resultado das duas consultas e desestruturo esse array em duas variaveis result e total
            db
            .select({
                id: courses.id,
                title: courses.title,
                description: courses.description,
                enrollments: count(enrollments.id),
            })
            .from(courses)
            .leftJoin(enrollments, eq(enrollments.courseId, courses.id))
            .orderBy(asc(courses[orderBy]))
       .limit(2)
       .offset((page - 1) * 2)
       .where(
            and(...conditions) //o and é usado para juntar as condições, o ... é usado para espalhar o array de condições
)
       .groupBy(courses.id),
       db.$count(courses, and(...conditions)) //o dolar count recebe qual tabela eu quero azer a contagem e recebe no segundo parametro o where
        ])
    
       return replay.send({ courses: result, total });
    })

}