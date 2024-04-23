const request = require("supertest")
const app = require('../app')

let genresId
const BASE_URL = '/api/v1/genres'
const genres = {
    name:'terror'
}
const updatedGenres = {
    name:'horror'
}


test('POST -> BASE_URL, Should give status 201 and res.body.name === genres.name', async () => { 
    const res = await request(app)
        .post(BASE_URL)
        .send(genres)

    genresId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genres.name)
 })

 test('GET -> BASE_URL, Should give status 200 and res.body.name === genres.name', async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
 })

 test('GET -> BASE_URL/:id, Should return status code 200, res.body.name === city.name', async() => {
    const res = await request(app)
        .get(`${BASE_URL}/${genresId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genres.name)
 })

 test('PUT -> BASE_URL/:id, Should give status 201 and res.body.name === updatedGenres.name', async () => {
    const res = await request(app)
        .put(`${BASE_URL}/${genresId}`)
        .send(updatedGenres)

    expect(res.statusCode).toBe(200)
    expect(res.body.id).toBe(genresId)
    expect(res.body.name).toBe(updatedGenres.name)
})

 test('DELETE -> BASE_URL/:id, Should give status 204 and res.body.length === 0', async() => {
    const res = await request(app)
        .delete(`${BASE_URL}/${genresId}`)

    expect(res.status).toBe(204)
 })  