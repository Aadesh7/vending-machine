jest.useFakeTimers();
const request = require('supertest')
const app = require('../server.js')
describe('Product API', () => {
    it('should show all productss', async () => {
        const res = await request(app).get('/api/product')
        expect(res.statusCode).toEqual(200)
    })
});