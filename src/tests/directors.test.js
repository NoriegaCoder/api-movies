const request = require("supertest")
const app = require('../app')

let directorsId
const BASE_URL = '/api/v1/directors'
const directors = {
    firstName:'Jhon',
    lastName:'Wick',
    nationality:'US',
    image:'randomText',
    birthday:'1991-05'
}
const updatedDirectors = {
    firstName:"Jhonathan"
}


test('POST -> BASE_URL, Should give status 201 and res.body.name === directors.name', async () => { 
    const res = await request(app)
        .post(BASE_URL)
        .send(directors)

    directorsId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(directors.name)
 })

 test('GET -> BASE_URL, Should give status 200 and res.body.name === directors.name', async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
 })

 test('GET -> BASE_URL/:id, Should return status code 200, res.body.name === city.name', async() => {
    const res = await request(app)
        .get(`${BASE_URL}/${directorsId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(directors.name)
 })

 test('PUT -> BASE_URL/:id, Should give status 201 and res.body.name === updatedDirectors.name', async () => {
    const res = await request(app)
        .put(`${BASE_URL}/${directorsId}`)
        .send(updatedDirectors)

    expect(res.statusCode).toBe(200)
    expect(res.body.id).toBe(directorsId)
    expect(res.body.name).toBe(updatedDirectors.name)
})

 test('DELETE -> BASE_URL/:id, Should give status 204 and res.body.length === 0', async() => {
    const res = await request(app)
        .delete(`${BASE_URL}/${directorsId}`)

    expect(res.status).toBe(204)
 })  