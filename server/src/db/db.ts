import mongoose from "mongoose";
import User from "./models/user-schema";
import Course from "./models/course-schema";
import groupChatModel from "./models/group-chat-schema";
import { UserClass } from "../../../types/UserClass";
import CreateUserBodyParams from "../../../types/Queries/CreateUser";
import { UserClassSection } from "../../../types/UserClassSection";
import { AddMessage } from "../../../types/Queries/AddMessage";
import { LoginRequest, LoginResponse } from "../../../types/Queries/Login";
import CompletedEventBodyParams from "../../../types/Queries/CompletedEvent";
import RemoveEventBodyParams from "../../../types/Queries/RemoveEvent";
import userModel from "./models/user-schema";
import { Events } from "../../../types/Event";
require("dotenv").config();

const dbName = process.env.DB_NAME || "CampusConnect";
const dbUri = process.env.DB_URI || "";

if (dbUri.length === 0) {
  process.exit(-1);
}

class DbMongoose {
  constructor() {
    this.connectDb();
  }
  connectDb() {
    let dbOptions = {
      dbName: "" + dbName,
    };

    mongoose.connect(dbUri, dbOptions);
  }

  disconnectdb() {
    mongoose.connection.close();
  }

  async login({ name, password }: LoginRequest): Promise<LoginResponse> {
    const user = await userModel.findOne({ name: name, password: password });

    if (user) {
      return { data: user };
    } else {
      return { data: null };
    }
  }

  async addUser({
    name,
    sections,
    picture,
    googleTokens,
    email,
    gid,
  }: CreateUserBodyParams): Promise<string> {
    const userModel = new User({
      name,
      sections,
      picture,
      googleTokens,
      email,
      gid,
    });
    console.log(userModel);
    await userModel.save();
    return userModel.toObject();
  }

  //Creates a Group chat based on course Number and Section
  async groupChat({
    courseNumber,
    sectionNumber,
  }: UserClassSection): Promise<string> {
    const groupChat = new groupChatModel({
      room: { courseNumber: courseNumber, sectionNumber: sectionNumber },
    });
    await groupChat.save();
    return groupChat.toObject();
  }

  async addCompletedEvent({
    userId,
    completedEvent,
  }: CompletedEventBodyParams) {
    const user = await userModel.findOne({ _id: userId });
    if (user) {
      user.completedEvents.push(completedEvent);
      const resp = await user.save();
      return resp.id!;
    }
  }

  async removeEvent({
    eventId,
    courseNumber,
    courseSection,
  }: RemoveEventBodyParams) {
    const course = await Course.findOne({ number: courseNumber });
    if (course) {
      const section = course.sections.find(
        (section) => section.number == courseSection
      )!;
      section.events = section.events.filter(
        (event, i) => event._id != eventId
      );
      course.save();
    }
  }

  async addEventToSection(
    courseNumber: string,
    sectionNumber: string,
    event: Events
  ) {
    const courses = await Course.find({ number: courseNumber });
    courses.forEach((c) => c.sections.forEach((s) => console.log(s.number)));
    const course = courses.find((course) =>
      course.sections.find((fullSection) => fullSection.number == sectionNumber)
    )!;
    const section = course.sections.find((s) => s.number == sectionNumber)!;
    console.log("section: ", sectionNumber);
    section.events.push(event);
    section.events[section.events.length - 1].mongoId =
      section.events[section.events.length - 1]._id;
    await course.save();
  }

  //Adds Message needs room{UserClassSection}and message:{UserMessage}
  async addMessage({ room, message }: AddMessage) {
    const groupChat = await groupChatModel.findOne({
      "room.courseNumber": room.courseNumber,
      "room.sectionNumber": room.sectionNumber,
    });
    if (groupChat) {
      groupChat.messagesList.push(message);
      await groupChat.save();
    } else {
      console.log("Dit not find the room");
    }
  }
  //Rerturns An Array with all themessages ordered by date.
  async getAllMessages(room: UserClassSection) {
    const groupChat = await groupChatModel.findOne({
      "room.courseNumber": room.courseNumber,
      "room.sectionNumber": room.sectionNumber,
    });
    if (groupChat) {
      const messagesList = groupChat.messagesList;
      return messagesList;
    }
  }

  //Rerturns An Array with all themessages ordered by date.
  async getLatestMessages(room: UserClassSection, messageId: string) {
    const groupChat = await groupChatModel.findOne({
      "room.courseNumber": room.courseNumber,
      "room.sectionNumber": room.sectionNumber,
    });
    if (groupChat) {
      const messagesList = groupChat.messagesList;
      const indexLastMessage = messagesList.findIndex(
        (message) => message._id!.toString() == messageId
      );
      if (indexLastMessage < 15) {
        const messages = messagesList.slice(0, indexLastMessage + 1);
        return messages;
      } else {
        const messages = messagesList.slice(
          indexLastMessage - 14,
          indexLastMessage + 1
        );
        return messages;
      }
    }
  }

  async getUserClasses(userSections: UserClassSection[]): Promise<UserClass[]> {
    const courses = userSections.map(async (userCourse) => {
      // Some courses can be taken from different programs. Right now they are duplicated in the DB.
      // For this reason, I'm alwaays selecting the first one.
      const courses = await Course.find({ number: userCourse.courseNumber });
      courses.forEach((c) => c.sections.forEach((s) => console.log(s.number)));
      const course = courses
        .find((course) =>
          course.sections.find(
            (fullSection) => fullSection.number == userCourse.sectionNumber
          )
        )!
        .toObject();
      // const section = courses.sections.find(fullSection => fullSection.number == userCourse.sectionNumber)!;
      return {
        ...course.sections[0],
        courseNumber: courses[0].number,
        courseTitle: courses[0].title,
      };
    });

    return await Promise.all(courses);
  }

  async getAllStrippedCourses() {
    const result = await Course.find().select({
      _id: 1,
      title: 1,
      number: 1,
      "sections.number": 1,
      "sections.teacher": 1,
    });
    console.log(result);
    return result;
  }

  //Get All Users
  async getAllUsers() {
    const result = await User.find();
    console.log(result);
    return result;
  }
}

export default new DbMongoose();
