const request = require('supertest');
const db = require('../models/base');
const { app } = require('../index');

beforeAll(async () => await db.sync());

describe('GET /api/v1/user/id/cart', () => {

  test('should return the available items in the cart', async () => {
    const { statusCode, body } = await request(app).get('/api/v1/user/1/cart');

    expect(body.response).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          cartId: expect.any(Number),
          noOfItems: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          productId: expect.any(Number),
          userId: expect.any(Number)
        })
      ])
    );
    expect(body.message).toMatch(/Items of the User/i);
    expect(statusCode).toBe(200);
  });

  test('should return a 404 error', async () => {
    const { statusCode, body } = await request(app).get('/api/v1/user/99/cart');

    expect(body.message).toMatch(/Cart is empty/i);
    expect(statusCode).toBe(404);
  });
})

describe('POST /api/v1/user/id/cart/addItem', () => {

  test('should add the item into the cart', async () => {
    const { statusCode, body } = await request(app).post('/api/v1/user/14/cart/addItem')
      .send({
        productId: 1,
        noOfItems: 5
      });

    expect(body.message).toMatch(/added successfully/i);
    expect(statusCode).toBe(200);
  })
});

describe('PUT /api/v1/user/id/cart/updateItem', () => {

  test('should update the item of the given id', async () => {
    const { statusCode, body } = await request(app).put('/api/v1/user/14/cart/updateItem')
      .send({
        previousProductId: 1,
        newProductId: 2,
        noOfItems: 3
      });

    expect(body.message).toMatch(/updated successfully/i);
    expect(statusCode).toBe(200);
  });

  test('should fail to update with a 404 code', async () => {
    const { statusCode, body } = await request(app).put('/api/v1/user/14/cart/updateItem')
      .send({
        previousProductId: 3,
        newProductId: 1,
        noOfItems: 3
      });

    expect(body.message).toMatch(/Unable to update/i);
    expect(statusCode).toBe(404);
  });
})

describe('DELETE /api/v1/user/id/cart/deleteItem', () => {

  test('should delete the item with the given id', async () => {
    const { statusCode, body } = await request(app).delete('/api/v1/user/14/cart/deleteItem')
      .send({ productId: 2 });

    expect(body.message).toMatch(/deleted successfully/i);
    expect(statusCode).toBe(200);
  });

  test('should fail to delete with a 404 code', async () => {
    const { statusCode, body } = await request(app).delete('/api/v1/user/14/cart/deleteItem')
      .send({ productId: 2 });

    expect(body.message).toMatch(/Unable to delete/i);
    expect(statusCode).toBe(404);
  })
});

afterAll(async () => await db.close());
