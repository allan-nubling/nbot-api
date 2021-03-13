import request from 'supertest'
import app from '@config/app'

describe('Test the app', () => {
    test('GET on "/"', () => {
        return request(app).get('/').expect(200)
    })
    
    test('GET em not existent route', () => {
        return request(app).get('/xiru').expect(404)
    })
})
