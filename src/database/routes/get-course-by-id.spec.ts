import { expect, test } from "vitest";
import { app } from "../../app.ts";
import supertest from "supertest";
import { makeCourse } from "../../tests/factures/make-course.ts";



test('get course by id',async () => {
    app.ready()

    const course = await makeCourse()

    const response = await supertest(app.server)
    .get(`/courses/${course.id}`) // substitua pelo ID real do curso que você deseja testar

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
        course: {
            id: expect.any(String),
            title: expect.any(String),
            description: expect.any(String) || null
        }
    })
})

test('get course by id not found',async () => {
    app.ready()


    const response = await supertest(app.server)
    .get(`/courses/06d20751-9ce5-4f10-95f3-3a291729a7bd`) // substitua pelo ID real do curso que você deseja testar

    expect(response.status).toEqual(404)

})