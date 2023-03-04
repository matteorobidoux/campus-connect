import mongoose from 'mongoose';

import User from "./models/user-schema"
import Event from './models/event-schema';
import Course from "./models/course-schema";
import { UserClass } from "../../../types/UserClass"
import CreateUserBodyParams from "../../../types/Queries/CreateUser";
import { UserClassSection } from "../../../types/UserClassSection"
import { GetAllSectionsResponse } from "../../../types/Queries/GetAllCourses"
import { LoginRequest, LoginResponse } from "../../../types/Queries/Login";
import userModel from './models/user-schema';
import { generateOAuthClient } from "../oauth/"; 
import { google } from 'googleapis';

// const dname = process.env.NAME || 'CampusConnect'
const dname = process.env.NAME || 'CampusConnect'

class DbMongoose {
  constructor() {
    this.connectDb();
  }
  connectDb() {
    let dbOptions = {
      dbName: "" + dname
    }

    mongoose.connect("mongodb+srv://nenechi:nenechi12@exercise11.cfvsryo.mongodb.net/?retryWrites=true&w=majority", dbOptions);
  }

  disconnectdb() {
    mongoose.connection.close()
  }

  async login({ name, password }: LoginRequest): Promise<LoginResponse> {
    const user = await userModel.findOne({ name: name, password: password });

    if (user) {
      return { data: user };
    } else {
      return { data: null };
    }

  }

  async addUser({name, sections, googleTokens, email, gid}: CreateUserBodyParams): Promise<string> {
    const userModel = new User({ name, sections, googleTokens, email, gid });
    console.log(userModel)
    await userModel.save();
    return userModel.toObject()
  }

  async addEvent(id: string, date: Date, title: string, desc: string, sectionName: string) {
    const eventModel = new Event({ id: id, date: date, title: title, desc: desc, associatedSection: { name: sectionName } })
    console.log(eventModel)
    await eventModel.save();
  }

  async getUserClasses(userSections: UserClassSection[]): Promise<UserClass[]> {
    const courses = userSections.map(async userCourse => {
      const course = (await Course.findOne({ number: userCourse.courseNumber }))!.toObject();
      const section = course.sections.find(fullSection => fullSection.number == userCourse.sectionNumber)!;
      return {
        ...section,
        courseNumber: course.number,
        courseTitle: course.title,
      }
    });

    return await Promise.all(courses);
  }

  async getAllStrippedCourses() {
    const result = await Course.find()
      .select({
        _id: 1,
        title: 1,
        number: 1,
        'sections.number': 1,
        'sections.teacher': 1
      })
    console.log(result);
    return result;
  }

  //Get All Users
  async getAllUsers() {
    const result = await User.find()
    console.log(result)
    return result;
  }
  //Get all Events
  async getAllEvents() {
    const result = await Event.find()
    console.log(result)
    return result;
  }

}

export default new DbMongoose();
