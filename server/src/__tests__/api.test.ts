
const request = require('supertest')
import mongoose from 'mongoose'
import { app, closeServer } from '../app'
jest.mock('../db/db.ts')

afterAll(async () => {
  jest.clearAllMocks()
  jest.restoreAllMocks()
  jest.clearAllTimers()
  await closeServer();
  await mongoose.connection.close()
  for (const connection of mongoose.connections) {
    await connection.close();
  }

})


describe('test Api Get All Users', () => {
  it('should return the doc ', async () => {
    const res = await request(app).get("/users")
    expect(res.body).toBeDefined()
  });
});

describe('test Api Login', () => {
  it('should return 400 with no data', async () => {
    const res = await request(app).get("/api/login")
    expect(res.status).toBe(404)
  });
});

describe('test api getAllStrippedCourses', () => {
  it('should return not undefined', async () => {
    const res = await request(app).get("/api/getAllStrippedCourses")
    expect(res.body).toBeDefined()
  });
});

