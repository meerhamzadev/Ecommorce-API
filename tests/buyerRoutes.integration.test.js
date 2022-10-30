const { app } = require('../index');
const request = require('supertest');
const db = require('../models/base');

beforeAll(async () => {
  return await db.sync()
});

describe('GET /api/v1/buyer/getProducts', () => {
  expect.assertions(3);
  test('should return list of all products', async () => {
    try {
      const { statusCode, body } = await request(app).get('/api/v1/buyer/getProducts');

      expect(body.productData).toEqual(
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
      expect(body.message).toMatch(/Product Details/i);
      expect(statusCode).toBe(200);
    }
    catch (err) {
      expect(err.message).toMatch(/server error/i);
      expect(err.status).toBe(500);
    }
  });

  test('should return an error message with 404 code', async () => {

  })
});

afterAll(async () => {
  return await db.close();
})