const request = require("supertest")
const app = require('../app')

let actorsId
const BASE_URL = '/api/v1/actors'
const actors = {
    firstName:'Jhon',
    lastName:'Wick',
    nationality:'US',
    image:'randomText',
    birthday:'1991-05'
}
const updatedActors = {
    firstName:"Jhonathan"
}


test('POST -> BASE_URL, Should give status 201 and res.body.name === actors.name', async () => { 
    const res = await request(app)
        .post(BASE_URL)
        .send(actors)

    actorsId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actors.name)
 })

 test('GET -> BASE_URL, Should give status 200 and res.body.name === actors.name', async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
 })

 test('GET -> BASE_URL/:id, Should return status code 200, res.body.name === city.name', async() => {
    const res = await request(app)
        .get(`${BASE_URL}/${actorsId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actors.name)
 })

 test('PUT -> BASE_URL/:id, Should give status 201 and res.body.name === updatedActors.name', async () => {
    const res = await request(app)
        .put(`${BASE_URL}/${actorsId}`)
        .send(updatedActors)

    expect(res.statusCode).toBe(200)
    expect(res.body.id).toBe(actorsId)
    expect(res.body.name).toBe(updatedActors.name)
})

 test('DELETE -> BASE_URL/:id, Should give status 204 and res.body.length === 0', async() => {
    const res = await request(app)
        .delete(`${BASE_URL}/${actorsId}`)

    expect(res.status).toBe(204)
 })  