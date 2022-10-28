const { app } = require('../index');
const request = require('supertest');
const db = require('../models/base');

beforeAll(async () => {
  return await db.sync()
});

describe('Post /api/v1/user/signIn', () => {

  test('Should respond with a json object containing jwt token', async () => {
    const { statusCode, body } = await request(app).post('/api/v1/user/signIn').send({
      email: 'hamzababar3@gmail.com',
      userPassword: 'Meer@2020'
    });

    expect(body.user).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        firstName: expect.any(String),
        lastName: expect.any(String),
        email: expect.any(String),
        user_password: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      }));
    expect(body.token).toEqual(expect.any(String));
    expect(body.message).toMatch(/Success/i);
    expect(statusCode).toBe(200);
  });

  test('Should respond with 404 code and not exist message', async () => {
    const { statusCode, body } = await request(app).post('/api/v1/user/signIn').send({
      email: 'hamzababar@gmail.com',
      userPassword: 'Meer@2020'
    });

    expect(body.message).toMatch(/does not exist/i);
    expect(statusCode).toBe(404);
  })

  test('Should respond with 400 code and Invalid Credential message', async () => {
    const { statusCode, body } = await request(app).post('/api/v1/user/signIn').send({
      email: 'hamzababar3@gmail.com',
      userPassword: 'Me@2020'
    });

    expect(body.message).toMatch(/Invalid Credentials/i);
    expect(statusCode).toBe(400);
  })

  test('Should respond with 500 code and Server Error message', async () => {

    const { body, statusCode } = await request(app).post('/api/v1/user/signIn').send({
      email: 1,
      userPassword: 'Me@2020'
    });
    console.clear();
    expect(body.message).toMatch(/Internal Server/i);
    expect(statusCode).toBe(500);
  })
});

afterAll(async () => {
  return await db.close();
})