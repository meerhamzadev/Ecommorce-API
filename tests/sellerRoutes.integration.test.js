const { app } = require('../index');
const request = require('supertest');
const db = require('../models/base');

beforeAll(async () => {
  return await db.sync()
});

let id;
describe('POST /api/v1/seller/addProduct', () => {

  test('should add a product in the database', async () => {
    const { statusCode, body } = await request(app).post('/api/v1/seller/addProduct').send({
      productName: 'dump',
      description: 'dump',
      price: 0.0,
      qtyStock: 0,
      productImage: 'dump'
    });
    expect(body.product).toEqual(
      expect.objectContaining({
        productName: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        qtyStock: expect.any(Number),
        productImage: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      })
    );
    expect(body.message).toMatch(/database successfully/i);
    expect(statusCode).toBe(200);
    id = body.product.productId;
  });
});


describe('PUT /api/v1/seller/updateProduct/id', () => {
  test('should update a product', async () => {
    const { body, statusCode } = await request(app).put(`/api/v1/seller/updateProduct/${id}`)
      .send({
        productName: 'dump',
        description: 'dump',
        price: 0.0,
        qtyStock: 0,
        productImage: 'dump',
        categoryID: 1
      });

    expect(body.message).toMatch(/updated successfully/i);
    expect(statusCode).toBe(200);
  });

  test('return an error msg with 404 code', async () => {
    const { body, statusCode } = await request(app).put(`/api/v1/seller/updateProduct/78`)
      .send({
        productName: 'dump',
        description: 'dump',
        price: 0.0,
        qtyStock: 0,
        productImage: 'dump',
        categoryID: 1
      });

    expect(body.message).toMatch(/does not exist/i);
    expect(statusCode).toBe(404);
  })
});

describe('DELETE /api/v1/seller/deleteProduct/id', () => {
  test('should delete a product', async () => {
    const { body, statusCode } = await request(app).delete(`/api/v1/seller/deleteProduct/${id}`);

    expect(body.message).toMatch(/deleted successfully/i);
    expect(statusCode).toBe(200);
  });

  test('should delete a product', async () => {
    const { body, statusCode } = await request(app).delete(`/api/v1/seller/deleteProduct/${id}`);

    expect(body.message).toMatch(/does not exist/i);
    expect(statusCode).toBe(404);
  });
});

afterAll(async () => {
  return await db.close();
});