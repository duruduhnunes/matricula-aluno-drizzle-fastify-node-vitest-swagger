import { expect, test} from 'vitest'
import supertest from 'supertest'
import { app } from '../../app.ts'


test('create course', async () => {
  await app.ready()
    const response  = await supertest(app.server)
    .post('/courses')
    .set('Content-type', 'application/json') //serve para informar o tipo de conteudo que estamos enviando
    .send({
        id: crypto.randomUUID(),
        title: 'Node.jssssssssss',
        description: 'Aprendaaaaaaaaa'
    })

    expect(response.status).toEqual(201)
    expect(response.body).toEqual({
        course: {
            id: expect.any(String),
            title: 'Node.jssssssssss',
            description: 'Aprendaaaaaaaaa'
        }
    })
})

