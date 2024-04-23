const request = require("supertest")
const app = require('../app')
require('../models')
const Director = require('../models/Director')
const Genre = require('../models/Genre')
const Actor = require('../models/Actor')

let moviesId
let movies
const BASE_URL = '/api/v1/movies'

beforeAll(async () => {
    const directors = await Director.create( {
        firstName:'Michael',
        lastName:'Bay',
        nationality:'US',
        image:'randomText',
        birthday:'1991-05'
    })
    
    const genres = await Genre.create( {
        name:'terror'
    })
    
    const actors = await Actor.create( {
        firstName:'Jhon',
        lastName:'Wick',
        nationality:'US',
        image:'randomText',
        birthday:'1991-05'
    })
    
    movies = {
        name:'scarfeis',
        image:'randomText',
        synopsis:'randonText',
        releaseYear:'1991',
        directorId:directors.id,
        genreId:genres.id,
        actorId:actors.id
    }
})


const updatedMovies = {
    name:'Scare face'
}


test('POST -> BASE_URL, Should give status 201 and res.body.name === movies.name', async () => { 
    const res = await request(app)
        .post(BASE_URL)
        .send(movies)

    moviesId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movies.name)
 })

 test('GET -> BASE_URL, Should give status 200 and res.body.name === movies.name', async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
 })

 test('GET -> BASE_URL/:id, Should return status code 200, res.body.name === city.name', async() => {
    const res = await request(app)
        .get(`${BASE_URL}/${moviesId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movies.name)
 })

 test('PUT -> BASE_URL/:id, Should give status 201 and res.body.name === updatedMovies.name', async () => {
    const res = await request(app)
        .put(`${BASE_URL}/${moviesId}`)
        .send(updatedMovies)

    expect(res.statusCode).toBe(200)
    expect(res.body.id).toBe(moviesId)
    expect(res.body.name).toBe(updatedMovies.name)
})

 test('DELETE -> BASE_URL/:id, Should give status 204 and res.body.length === 0', async() => {
    const res = await request(app)
        .delete(`${BASE_URL}/${moviesId}`)

    expect(res.status).toBe(204)
 })  

 test("Post -> URL_BASE/:id/artists, should return statusCode 200, and res.body.length === 1", async () => {
    
 })
  