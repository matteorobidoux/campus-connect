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
import { User as UserType } from "../../../types/User";
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

  async getUser(gid: string): Promise<UserType> {
    const user = await userModel.findOne({ gid });
    return user!.toObject();
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
      let hasEvent = user.completedEvents.map((e) => {
        return e.id;
      });
      if (!hasEvent.includes(completedEvent.id!)) {
        user.completedEvents.push(completedEvent);
        const resp = await user.save();
        return resp.id!;
      } else {
        console.log("The event you tried to add Already exists");
      }
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

  async changeUserImage({ id, picture }: { id: string; picture: string }) {
    const user = await User.findOne({ _id: id });
    if (user) {
      user.picture = picture;
      await user.save();
    }
  }

  async addEventToSection(
    courseNumber: string,
    sectionNumber: string,
    event: Omit<Events, "_id">
  ) {
    const courses = await Course.find({ number: courseNumber });
    courses.forEach((c) => c.sections.forEach((s) => console.log(s.number)));
    const course = courses.find((course) =>
      course.sections.find((fullSection) => fullSection.number == sectionNumber)
    )!;
    const section = course.sections.find((s) => s.number == sectionNumber)!;
    console.log("section: ", sectionNumber);
    section.events.push(event as Events);
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
      console.log("Did not find the room");
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
  async getLatestMessages(room: UserClassSection, loadedMsgIndex: number) {
    //15 messages
    const groupChat = await groupChatModel.findOne({
      "room.courseNumber": room.courseNumber,
      "room.sectionNumber": room.sectionNumber,
    });
    if (groupChat) {
      const messagesList = groupChat.messagesList;
      //Check if all messages have been loaded already
      if (messagesList.length - loadedMsgIndex * 15 - 15 <= -15) {
        return null;
      }
      //Check if less than 15 messages
      if (messagesList.length < 15) {
        return messagesList;
      } else if (
        messagesList.length > loadedMsgIndex * 15 &&
        messagesList.length - loadedMsgIndex * 15 - 15 >= 0
      ) {
        let messages = messagesList.slice(
          messagesList.length - loadedMsgIndex * 15 - 15,
          messagesList.length - loadedMsgIndex * 15
        );
        return messages;
      } else {
        let messages = messagesList.slice(
          0,
          messagesList.length - loadedMsgIndex * 15 - 1
        );
        return messages;
      }
    } else {
      throw new Error("trying to get inexisting room");
    }
  }

  async getMostRecentMessage(room: UserClassSection) {
    const groupChat = await groupChatModel.findOne({
      "room.courseNumber": room.courseNumber,
      "room.sectionNumber": room.sectionNumber,
    });
    if (groupChat) {
      const message = groupChat.messagesList;
      if (message.length > 0) {
        return {
          message: message[message.length - 1].message,
          username: message[message.length - 1].user.userName,
        };
      }
    }
  }

  async getUserClasses(userSections: UserClassSection[]): Promise<UserClass[]> {
    const courses = userSections.map(async (userCourse) => {
      const course = (await Course.findOne({
        number: userCourse.courseNumber,
      }))!.toObject();
      const section = course.sections.find(
        (fullSection) => fullSection.number == userCourse.sectionNumber
      )!;
      return {
        ...section,
        courseNumber: course.number,
        courseTitle: course.title,
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
}

export default new DbMongoose();
