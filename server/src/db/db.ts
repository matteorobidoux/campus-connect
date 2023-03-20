import mongoose from 'mongoose';
import User from "./models/user-schema"
import Event from './models/event-schema';
import Course from "./models/course-schema";
import groupChatModel from './models/group-chat-schema';
import { UserClass } from "../../../types/UserClass"
import CreateUserBodyParams from "../../../types/Queries/CreateUser";
import { UserClassSection } from "../../../types/UserClassSection"
import { AddMessage } from "../../../types/Queries/AddMessage"
import { GetAllSectionsResponse } from "../../../types/Queries/GetAllCourses"
import { LoginRequest, LoginResponse } from "../../../types/Queries/Login";
import CompletedEventBodyParams from '../../../types/Queries/CompletedEvent';
import RemoveEventBodyParams from '../../../types/Queries/RemoveEvent';
import userModel from './models/user-schema';
import Section from './models/section-schema';
import { Events } from '../../../types/Event';
import { generateOAuthClient } from "../oauth/";
import { google } from 'googleapis';
import { UserMessage } from '../../../types/MessageUser';

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

  async addUser({ name, sections, picture, googleTokens, email, gid }: CreateUserBodyParams): Promise<string> {
    const userModel = new User({ name, sections, picture, googleTokens, email, gid });
    console.log(userModel)
    await userModel.save();
    return userModel.toObject()
  }

  //Creates a Group chat based on course Number and Section
  async groupChat({ courseNumber, sectionNumber }: UserClassSection): Promise<string> {
    const groupChat = new groupChatModel({ room: { courseNumber: courseNumber, sectionNumber: sectionNumber } });
    console.log(groupChat)
    await groupChat.save();
    return groupChat.toObject()
  }

  
  async addCompletedEvent({ userName, completedEvent }: CompletedEventBodyParams) {
    const user = await userModel.findOne({ name: userName });
    if (user) {
      user.completedEvents.push(completedEvent);
      const resp = await user.save()
      return resp.id!
    }

  }

  async removeEvent({ eventId, courseNumber, courseSection }: RemoveEventBodyParams) {
    const course = await Course.findOne({ number: courseNumber });
    if (course) {
      const section = course.sections.find(section => section.number == courseSection)!;
      section.events = section.events.filter((event, i) => event._id != eventId)
      course.save()
    }
  }

  async addEventToSection(courseNumber: string, sectionNumber: string, event: Events) {
    const courses = (await Course.find({ number: courseNumber }));
    courses.forEach(c => c.sections.forEach(s => console.log(s.number)));
    const course = courses.find(course => course.sections.find(fullSection => fullSection.number == sectionNumber))!;
    const section = course.sections.find(s => s.number == sectionNumber)!;
    console.log("section: ", sectionNumber)
    section.events.push(event);
    section.events[section.events.length - 1].mongoId = section.events[section.events.length - 1]._id
    await course.save();
  }

  //Adds Message needs room{UserClassSection}and message:{UserMessage}
  async addMessage({ room, message }: AddMessage) {
    const groupChat = await groupChatModel.findOne({ 'room.courseNumber': room.courseNumber, 'room.sectionNumber':room.sectionNumber })
    if (groupChat) {
      console.log("Found the Room")
      console.log(groupChat)
      groupChat.messagesList.push(message)
      await groupChat.save()
    }else{
      console.log("Dit not find the room")
    }
  }
  //Rerturns An Array with all themessages ordered by date.
  async getAllMessages(room: UserClassSection) {
    const groupChat = await groupChatModel.findOne({ 'room.courseNumber': room.courseNumber, 'room.sectionNumber':room.sectionNumber })
    if(groupChat){
       const messagesList = groupChat.messagesList.sort((a,b)=>a.date.getTime() - b.date.getTime())
      console.log(messagesList)
      return messagesList;
    }
   
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

}

export default new DbMongoose();
