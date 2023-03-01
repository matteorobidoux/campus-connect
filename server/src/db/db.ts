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

  async addUser({ name, password, sections }: CreateUserBodyParams): Promise<string> {
    const userModel = new User({ name, password, sections })
    console.log(userModel)
    const resp = await userModel.save();
    return resp.id!
  }

  async addEvent(id: string, date: Date, title: string, desc: string, sectionName: string) {
    const eventModel = new Event({ id: id, date: date, title: title, desc: desc, associatedSection: { name: sectionName } })
    console.log(eventModel)
    await eventModel.save();
  }

  // async addUsertoSection(coursenumb:string) {
  //   Course.findOne({number: coursenumb}, function(err, course) {
  //     course.sections[0].students.push("ho")
  //     course.save()
  //   })
  // }


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

  // async getAllSections(): Promise<GetAllSectionsResponse> {
  //   const mongoResp = await Course.find();
  //   const result = mongoResp.map(r => ({
  //     title: r.title,
  //     sections: r.sections.map(s => ({ teacher: s.teacher, number: s.number })),
  //     id: r.id as string,
  //   }))

  //   console.log(result);

  //   return {response: result};
  // }

}

export default new DbMongoose();
