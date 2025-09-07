import { expect, test } from "vitest";
import { app } from "../../app.ts";
import supertest from "supertest";
import { randomUUID } from "crypto";
import { makeCourse } from "../../tests/factures/make-course.ts";

test('get courses', async () => {
     await app.ready()

     const titleId = randomUUID()
     const course = await makeCourse(titleId)

     const response = await supertest(app.server)
     .get(`/courses?search=${titleId}`)
   
     expect(response.status).toEqual(200)
    
         expect(response.body).toEqual({
            total: 1,
            courses: [
                {
                    id:  expect.any(String),
                    title: titleId,
                    enrollments: 0,
                    description: expect.any(String) || null
                }
            ]
         })
    })


