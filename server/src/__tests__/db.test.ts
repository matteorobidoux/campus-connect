const mockingoose = require("mockingoose");
import Course from "../db/models/course-schema";
import Section from "../db/models/section-schema";
import User from "../db/models/user-schema";

describe("test mongoose User model", () => {
  it("should return the doc with findById", () => {
    const _doc = {
      name: "nameOb",
      completedEvents: [],
      sections: [],
      email: "",
      gid: "",
      googleTokens: {},
    };
    mockingoose(User).toReturn(_doc, "findOne");
    return User.findById({ name: "nameOb" }).then((doc) => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
    });
  });
});

describe("test mongoose Course model", () => {
  it("should return the doc with find", () => {
    const _doc = {
      title: "Web Dev IV",
      number: "540-dw-345",
      sections: [],
    };
    mockingoose(Course).toReturn(_doc, "find");
    return Course.find({ title: "Web Dev IV" }).then((doc) => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
    });
  });
});

describe("test mongoose Section model", () => {
  it("should return the doc with findOne", () => {
    const _doc = {
      schedule: [],
      events: [],
      number: "0001",
      teacher: "Ricardo Nornman",
      students: [],
    };
    mockingoose(Section).toReturn(_doc, "findOne");
    return Section.findOne({ section: "0001" }).then((doc) => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
    });
  });
});
