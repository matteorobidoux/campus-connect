import mongoose from 'mongoose';

import User from "./models/user-schema"
import Event from './models/event-schema';
import Course from "./models/course-schema";
import Section from "./models/section-schema";

const dname= process.env.NAME || 'test'

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

  async addUser(nameUser: string, passwd: string, classes: string[]) {
    const abie = new User({ name: nameUser, password: passwd, class: classes })
    await abie.save();

  }

  async addEvent(id: string, date: Date, title: string, desc: string, sectionName: string) {
    const abie = new Event({ id: id, date: date, title: title, desc: desc, associatedSection: { name: sectionName } })
    console.log(abie)
    await abie.save();
  }

  async getUserByClasss(classname: string) {
    const result = await User.find({ class: classname })
    console.log(result)
    return result;
  }

  async getAllUsers() {
    const result = await User.find()
    console.log(result)
    return result;
  }
  async getAllEvents() {
    const result = await Event.find()
    console.log(result)
    return result;
  }
}

export default new DbMongoose();



