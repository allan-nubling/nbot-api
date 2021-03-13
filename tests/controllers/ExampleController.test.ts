import request from 'supertest'
import app from '../../src/config/app'

describe('Test the ExampleController', () => {
    test('Test POST /example route with 400', () => {
        return request(app).post('/example').send({ error: 400 }).expect(400)
    })
    
    test('Test POST /example route with 401', () => {
        return request(app).post('/example').send({ error: 401 }).expect(401)
    })
    
    test('Test POST /example route with 404', () => {
        return request(app).post('/example').send({ error: 404 }).expect(404)
    })    
    test('Test POST /example route with nothing', () => {
        return request(app).post('/example').expect(500)
    })
})
