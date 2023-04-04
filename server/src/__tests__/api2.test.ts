const request = require("supertest");
import mongoose from "mongoose";
import { app } from "../api-jest/app";
import { UserClassSection } from "../../../types/UserClassSection";
import { GetAllSectionsRequest } from "../../../types/Queries/GetAllCourses";
jest.mock("../db/db");
afterAll(async () => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
  jest.clearAllTimers();
  await mongoose.connection.close();
  for (const connection of mongoose.connections) {
    await connection.close();
  }
});

describe("test api removeEvent", () => {
  it("should return status 400 missing a parameter", async () => {
    const res = await request(app).post("/api/removeEvent").send({
      eventId: "640ac0b131483eb8b8a1cb81",
      courseNumber: "574-453-DW",
    });
    expect(res.statusCode).toBe(400);
  });
});

describe("test api appLogin", () => {
  it("should return status 200", async () => {
    const res = await request(app).post("/api/login").send({
      name: "tesNameJesus",
      password: "574-453-DW",
    });
    expect(res.statusCode).toBe(200);
  });
});

describe("test api appLogin", () => {
  it("should return status 400", async () => {
    const res = await request(app).post("/api/login").send({
      name: "tesNameJesus",
    });
    expect(res.statusCode).toBe(400);
  });
});

describe("test api addEvent", () => {
  it("should return 200", async () => {
    const res = await request(app)
      .post("/api/addEvent")
      .send({
        section: { courseNumber: "574-453-DW", sectionNumber: "00001" },
        event: {
          ownerId: "640ac0b131483eb8b8a1cb82",
          date: Date,
          title: "Today Carrots",
          desc: "carrots and eyes",
          courseTitle: "Story Board",
        },
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({ success: true });
  });
});

describe("test api addEvent", () => {
  it("should return 400 missing a parameter", async () => {
    const res = await request(app)
      .post("/api/addEvent")
      .send({
        event: {
          ownerId: "640ac0b131483eb8b8a1cb82",
          date: Date,
          title: "Today Carrots",
          desc: "carrots and eyes",
          courseTitle: "Story Board",
        },
      });
    expect(res.statusCode).toBe(400);
  });
});

describe("test api addUser", () => {
  it("should return 200", async () => {
    const user = {
      gid: "string",
      email: "string",
      name: "string",
      picture: "string",
      sections: [],
      googleTokens: {
        refresh_token: "string",
        access_token: "string",
      },
    };
    const res = await request(app).post("/api/addUser").send({
      user,
    });
    expect(res.statusCode).toBe(200);
  });
});

describe("test api addCompletedEvent", () => {
  it("should return 400 a parameter is missing", async () => {
    const res = await request(app)
      .post("/api/addCompletedEvent")
      .send({
        completedEvent: {
          id: "string",
          date: Date,
        },
      });
    expect(res.statusCode).toBe(400);
  });
});
