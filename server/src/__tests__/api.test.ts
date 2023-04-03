const request = require("supertest");
import mongoose from "mongoose";
import { app } from "../api-jest/app";
import { UserClassSection } from "../../../types/UserClassSection";
import { GetAllSectionsRequest } from "../../../types/Queries/GetAllCourses";
<<<<<<< HEAD
jest.mock("../db/db.ts");
jest.mock("../oauth/gauth-endpoint");
jest.mock("../oauth/index");
=======
jest.mock("../db/db");
jest.mock("../oauth/gauth-endpoint")
jest.mock("../oauth/index")
>>>>>>> 29152ecff5f0f2fba3daf2b4842725b297a3c139
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

<<<<<<< HEAD
describe("test api getAllStrippedCourses", () => {
  it("should return 400", async () => {
    const res = await request(app).get("/api/getAllStrippedCourses");
    expect(res.status).toBe(400);
  });
});

=======
>>>>>>> 29152ecff5f0f2fba3daf2b4842725b297a3c139
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

<<<<<<< HEAD
describe("test api getMostRecentMessage", () => {
  it("should return 200 res body Defined", async () => {
    const room = {
      courseNumber: "574-453-DW",
      sectionNumber: "00001",
    };
    const res = await request(app).get("/api/getMostRecentMessage").send(room);
    expect(res.body).toBeDefined();
  });
});

describe("test api getLatestMessages", () => {
  it("should return 400 missig req param", async () => {
    const room = {
      room: { courseNumber: "574-453-DW", sectionNumber: "00001" },
    };
    const res = await request(app).get("/api/getLatestMessages").send(room);
    expect(res.status).toBe(400);
  });
});

describe("test api getAllSections", () => {
  it("should return not undefined", async () => {
    const room: UserClassSection[] = [
      {
        courseNumber: "574-453-DW",
        sectionNumber: "00001",
      },
    ];
    const abe: GetAllSectionsRequest = { userClassSections: room };

    const res = await request(app)
      .get("/api/getAllSections")
      .send(abe.userClassSections);
    expect(res.status).toBe(400);
  });
});
=======


>>>>>>> 29152ecff5f0f2fba3daf2b4842725b297a3c139


