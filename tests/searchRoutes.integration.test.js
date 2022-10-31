const request = require('supertest');
const db = require('../models/base');
const { app } = require('../index');

beforeAll(async () => await db.sync());

describe('GET /api/v1/search?searchQuery', () => {

  test('should return results according to query string', async () => {
    const { body, statusCode } = await request(app).get('/api/v1/search?cat=Fashion&n=Denim&key=Best&f=true');

    expect(body.result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          productId: expect.any(Number),
          productName: expect.any(String),
          description: expect.any(String),
          price: expect.any(Number),
          qtyStock: expect.any(Number),
          productImage: expect.any(String),
          categoryID: expect.any(Number),
          Category: expect.objectContaining({
            categoryName: expect.any(String)
          })
        })
      ])
    );
    expect(body.message).toMatch(/available products/i);
    expect(statusCode).toBe(200);
  });

  test('should return a 404 error', async () => {
    const { body, statusCode } = await request(app).get('/api/v1/search?cat=Fashion&n=dkajsflkajfd&key=Best&f=true');

    expect(body.message).toMatch(/Unable to find/i);
    expect(statusCode).toBe(404);
  });

})

afterAll(async () => await db.close());