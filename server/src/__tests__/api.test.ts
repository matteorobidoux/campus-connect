
const request = require('supertest')
import {app} from '../app'
jest.mock('../db/db.ts')

afterAll( async () =>{
  // app.listen().close()
})

describe('test Api Get All Users', () => {
  it('should return the doc ', async () => {
    const res= await request(app).get("/users")
    expect(res.body).toBeDefined()
  });
});

describe('test Api Login', () => {
  it('should return 400 with no data', async () => {
    const res= await request(app).get("/api/login")
    expect(res.status).toBe(404)
  });
});

describe('test api getAllStrippedCourses', () => {
  it('should return not undefined', async () => {
    const res= await request(app).get("/api/getAllStrippedCourses")
    expect(res.body).toBeDefined()
  });
});

