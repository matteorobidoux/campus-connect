const request = require("supertest");
import mongoose from "mongoose";
import { app } from "../api-jest/app";
import { UserClassSection } from "../../../types/UserClassSection";
import { GetAllSectionsRequest } from "../../../types/Queries/GetAllCourses";
jest.mock("../db/db");
jest.mock("../oauth/gauth-endpoint")
jest.mock("../oauth/index")
afterAll(async () => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
  jest.clearAllTimers();
  await mongoose.connection.close();
  for (const connection of mongoose.connections) {
    await connection.close();
  }
});

describe("test Api Login", () => {
  it("should return 400 with no data", async () => {
    const res = await request(app).get("/api/login");
    expect(res.status).toBe(404);
  });
});

describe("test api getAllMessages", () => {
  it("should return not undefined and 200", async () => {
    const room = {
      courseNumber: "574-453-DW",
      sectionNumber: "00001",
    };
    const res = await request(app).get("/api/getAllMessages").send(room);
    expect(res.body).toBeDefined();
    expect(res.status).toBe(200);
  });
});

describe("test api getAllMessages", () => {
  it("should return 400 missing parameter", async () => {
    const room = {
      courseSection: "00001",
    };
    const res = await request(app).get("/api/getAllMessages").send(room);
    expect(res.status).toBe(400);
  });
});

describe("test api getLatestMessages", () => {
  it("should return 200 res body Defined", async () => {
    const room = {
      room: { courseNumber: "574-453-DW", sectionNumber: "00001" },
      loadedMsgIndex: 0,
    };
    const res = await request(app).get("/api/getLatestMessages").send(room);
    expect(res.body).toBeDefined();
  });
});





