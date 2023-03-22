
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

describe('test api getAllMessages', () => {
  it('should return not undefined', async () => {
    const room = {
      courseNumber: "574-453-DW",
      courseSection: "00001"
    }
    const res = await request(app).get("/api/getAllMessages").send(
      room
    )
    expect(res.body).toBeDefined()
  });
});

describe('test api getAllMessages', () => {
  it('should return 400 missing parameter', async () => {
    const room = {
      courseSection: "00001"
    }
    const res = await request(app).get("/api/getAllMessages").send(
      room
    )
    expect(res.status).toBe(400)
  });
});

describe('test api getAllSections', () => {
  it('should return not undefined', async () => {
    const room = {
      courseNumber: "574-453-DW",
      courseSection: "00001"
    }
    const res = await request(app).get("/api/getAllSections").send(
      room
    )
    expect(res.body).toBeDefined()
  });
});


describe('test api removeEvent', () => {
  it('should return status 200', async () => {
    const res = await request(app).post("/api/removeEvent").send({
      eventId: "640ac0b131483eb8b8a1cb81",
      courseNumber: "574-453-DW",
      courseSection: "00001"
    })
    expect(res.statusCode).toBe(200);
  });
});

describe('test api removeEvent', () => {
  it('should return status 400 missing a parameter', async () => {
    const res = await request(app).post("/api/removeEvent").send({
      eventId: "640ac0b131483eb8b8a1cb81",
      courseNumber: "574-453-DW",

    })
    expect(res.statusCode).toBe(400);
  });
});


describe('test api appLogin', () => {
  it('should return status 200', async () => {
    const res = await request(app).post("/api/login").send({
      name: "tesNameJesus",
      password: "574-453-DW",
    })
    expect(res.statusCode).toBe(200);
  });
});

describe('test api appLogin', () => {
  it('should return status 400', async () => {
    const res = await request(app).post("/api/login").send({
      name: "tesNameJesus",
    })
    expect(res.statusCode).toBe(400);
  });
});

describe('test api addEvent', () => {
  it('should return 200', async () => {
    const res = await request(app).post("/api/addEvent").send({
      section: { courseNumber: "574-453-DW", sectionNumber: "00001" },
      event: {
        ownerId: "640ac0b131483eb8b8a1cb82",
        date: Date,
        title: "Today Carrots",
        desc: "carrots and eyes",
        courseTitle: "Story Board",
      }
    })
    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({ success: true })
  });
});

describe('test api addEvent', () => {
  it('should return 400 missing a parameter', async () => {
    const res = await request(app).post("/api/addEvent").send({
      event: {
        ownerId: "640ac0b131483eb8b8a1cb82",
        date: Date,
        title: "Today Carrots",
        desc: "carrots and eyes",
        courseTitle: "Story Board",
      }
    })
    expect(res.statusCode).toBe(400);
  });
});

describe('test api addUser', () => {
  it('should return 200', async () => {

    const user = {
      gid: "string",
      email: "string",
      name: "string",
      picture: "string",
      sections: [],
      googleTokens: {
        refresh_token: "string",
        access_token: "string"
      }
    }
    const res = await request(app).post("/api/addUser").send({
      user
    })
    expect(res.statusCode).toBe(200);
  });
});

describe('test api addCompletedEvent', () => {
  it('should return 200', async () => {
    const res = await request(app).post("/api/addCompletedEvent").send({
      userName: "string",
      completedEvent: {
        id: "string",
        date: Date
      }
    })
    expect(res.statusCode).toBe(200);
  });
});

describe('test api addCompletedEvent', () => {
  it('should return 400 a parameter is missing', async () => {
    const res = await request(app).post("/api/addCompletedEvent").send({

      completedEvent: {
        id: "string",
        date: Date
      }
    })
    expect(res.statusCode).toBe(400);
  });
});