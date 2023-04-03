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


describe("test api getMostRecentMessage", () => {
  it("should return 200 res body Defined", async () => {
    const room = {
       courseNumber: "574-453-DW",
      sectionNumber: "00001"
     
    };
    const res = await request(app).get("/api/getMostRecentMessage").send(room);
    expect(res.body).toBeDefined();
  });
});

describe("test api getLatestMessages", () => {
  it("should return 400 missig req param", async () => {
    const room = {
      room: {courseNumber: "574-453-DW",
      sectionNumber: "00001"},
    };
    const res = await request(app).get("/api/getLatestMessages").send(room);
    expect(res.status).toBe(400);
 
  });
});

describe("test api getAllSections", () => {
  it("should return not undefined", async () => {
    const room : UserClassSection[]=[ {
       courseNumber: "574-453-DW",
      sectionNumber: "00001",
      
    }];
    const abe:GetAllSectionsRequest={userClassSections:room};
    
    const res = await request(app).get("/api/getAllSections").send(abe.userClassSections);
    expect(res.status).toBe(400);
  });
});

describe("test api getAllSections", () => {
  it("should return 400 error", async () => {
    const room = {
      courseNumber: "574-453-DW",
    };
    const res = await request(app).get("/api/getAllSections").send("room");
    expect(res.status).toBe(400);
  });
});

describe("test api removeEvent", () => {
  it("should return status 200", async () => {
    const res = await request(app).post("/api/removeEvent").send({
      eventId: "640ac0b131483eb8b8a1cb81",
      courseNumber: "574-453-DW",
      courseSection: "00001",
    });
    expect(res.statusCode).toBe(200);
  });
});
