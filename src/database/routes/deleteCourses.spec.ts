import { expect, test } from "vitest";
import { app } from "../../app.ts";
import supertest from "supertest";
import { makeCourse } from "../../tests/factures/make-course.ts";



test("should be able delete a course", async () => {
     await app.ready()

    const course = await makeCourse()

    const response = await supertest(app.server)
    .delete(`/courses/${course.id}`)
    
    expect(response.status).toEqual(200)


})

test("should be able not found a course", async () => {
    await app.ready()

    const response = await supertest(app.server)
    .delete(`/courses/06d20751-9ce5-4f10-95f3-3a291729a7bd`)
    expect(response.status).toEqual(404)
})