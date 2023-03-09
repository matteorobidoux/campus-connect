import mongoose from 'mongoose';

import User from "./models/user-schema"
import Event from './models/event-schema';
import Course from "./models/course-schema";
import { UserClass } from "../../../types/UserClass"
import CreateUserBodyParams from "../../../types/Queries/CreateUser";
import { UserClassSection } from "../../../types/UserClassSection"
import { GetAllSectionsResponse } from "../../../types/Queries/GetAllCourses"
import { LoginRequest, LoginResponse } from "../../../types/Queries/Login";
import CompletedEventBodyParams from '../../../types/Queries/CompletedEvent';
import RemoveEventBodyParams from '../../../types/Queries/RemoveEvent';
import userModel from './models/user-schema';
<<<<<<< HEAD
import { generateOAuthClient } from "../oauth/";
=======
import Section from './models/section-schema';
import { Events } from '../../../types/Event';
import { generateOAuthClient } from "../oauth/"; 
>>>>>>> 59e62a7a3128af36884ad41cd32089c7de9eed04
import { google } from 'googleapis';
import Events from '../../../types/Event';

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

  async addUser({ name, sections, googleTokens, email, gid }: CreateUserBodyParams): Promise<string> {
    const userModel = new User({ name, sections, googleTokens, email, gid });
    console.log(userModel)
    await userModel.save();
    return userModel.toObject()
  }

  // async addEvent(id: string, date: Date, title: string, desc: string, sectionName: string) {
  //   const eventModel = new Event({ id: id, date: date, title: title, desc: desc, associatedSection: { name: sectionName } })
  //   console.log(eventModel)
  //   await eventModel.save();
  // }

  async addCompletedEvent({ userName, completedEvent }: CompletedEventBodyParams) {
    const user = await userModel.findOne({ name: userName });
    if (user) {
      user.completedEvents.push(completedEvent);
      const resp = await user.save()
      return resp.id!
    }

  }
  // async addeventosection(cN: string, sN:string, event:Events){
  //   const course = await Course.findOne({ number: cN });
  //   if (course) {
  //     console.log("found the course")
  //     const section = course.sections.find(section => section.number == sN)!;
  //     section.events.push((event))
  //     course.save()
  //     console.log("succeded")
  //   }
  // }

  async removeEvent({ eventId, courseNumber, courseSection }: RemoveEventBodyParams) {
    const course = await Course.findOne({ number: courseNumber });
    if (course) {
      const section = course.sections.find(section => section.number == courseSection)!;
      section.events = section.events.filter((event, i) => event._id != eventId)
      course.save()
    }
  }

  // async addUsertoSection(coursenumb:string) {
  //   Course.findOne({number: coursenumb}, function(err, course) {
  //     course.sections[0].students.push("ho")
  //     course.save()
  //   })
  // }

  async addEventtoSection(courseNumber: string, sectionNumber:string, event: Events) {
      const courses = (await Course.find({ number: courseNumber }));
      courses.forEach(c => c.sections.forEach(s => console.log(s.number)));
      const course = courses.find(course => course.sections.find(fullSection => fullSection.number == sectionNumber))!;
      const section = course.sections.find(s => s.number == sectionNumber)!;
      console.log("section: ", sectionNumber)
      section.events.push(event);
      await course.save();
  }


  async getUserClasses(userSections: UserClassSection[]): Promise<UserClass[]> {
    const courses = userSections.map(async userCourse => {
      // Some courses can be taken from different programs. Right now they are duplicated in the DB.
      // For this reason, I'm alwaays selecting the first one.
      const courses = (await Course.find({ number: userCourse.courseNumber }));
      courses.forEach(c => c.sections.forEach(s => console.log(s.number)));
      const course = courses.find(course => course.sections.find(fullSection => fullSection.number == userCourse.sectionNumber))!.toObject();
      // const section = courses.sections.find(fullSection => fullSection.number == userCourse.sectionNumber)!;
      return {
        ...course.sections[0],
        courseNumber: courses[0].number,
        courseTitle: courses[0].title,
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
