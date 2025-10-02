import { expect, test } from "vitest";
import { app } from "../../app.ts";
import supertest from "supertest";
import { title } from "process";
import { makeCourse } from "../../tests/factures/make-course.ts";

test("should be able update an user", async () => {
  const course = await makeCourse();

  await app.ready();
  const response = await supertest(app.server)
    .put(`/courses/${course.id}`)
    .set("Content-type", "application/json")
    .send({
      title: "course another course",
      description: "slaslasla",
    });


  expect(response.status).toEqual(200);

})


test("should be able not found a course", async () => {
  await app.ready();

  const resonse = await supertest(app.server).put(
    `/course/06d20751-9ce5-4f10-95f3-3a291729a7bd`
  );

  expect(resonse.status).toEqual(404);
});
