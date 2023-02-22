import mongoose from 'mongoose';

import User from "./models/user-schema"
import Event from './models/event-schema';
import Course from "./models/course-schema";
import Section from "./models/section-schema";
import Usersection from "../../types/Usersection"
import fs = require('fs');
import path = require("path");
import * as config from "../../config.json"
const dname = process.env.NAME || 'test'

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


  async addUser(nameUser: string, passwd: string, classes: string[],sectionsuser: Usersection[]) {
    const usermodel = new User({ name: nameUser, password: passwd, classes: classes, sections: sectionsuser })
    console.log(usermodel)
    await usermodel.save();

  }

  async addEvent(id: string, date: Date, title: string, desc: string, sectionName: string) {
    const eventmodel = new Event({ id: id, date: date, title: title, desc: desc, associatedSection: { name: sectionName } })
    console.log(eventmodel)
    await eventmodel.save();
  }

  async getUserByClasss(classname: string) {
    const result = await User.find({ class: classname })
    console.log(result)
    return result;
  }
  async getUserClassses(nameUser: string) {
    const result = await User.find({ name: nameUser })
    const values= result[0].classes
    console.log(values)
    return values;
  }
  async getUserClassses2(nameUser: string) {
    const result = await User.find({ name: nameUser })
    const values= await result[0].sections
    let classlist: string[] = []
    values.forEach(function(value){
      classlist.push(value.coursenumber)
    }) 
    console.log(classlist)
    return values;
  }
  async getClass(courseNumber:string, sectionNumber:string){
    const result= await Course.find({number: courseNumber})
    const title= result[0].title
    console.log(title)
    return title;
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

  addAllClasses() {
    const jsonsInDir = fs.readdirSync(config.scraperOutputLocation);
    jsonsInDir.forEach(file => {
      const fileData = fs.readFileSync(path.join(config.scraperOutputLocation, file));
      const json = JSON.parse(fileData.toString());
      json.forEach((courseJSON: { title: any; number: any; sections: any[]; }) => {
        const course = new Course({
          "title": courseJSON.title,
          "number": courseJSON.number,
          "sections": []
        })
        course.save()
        courseJSON.sections.forEach((sectionJSON: any) => {
          const section = new Section(sectionJSON);
          course.sections.push(section);
          section.save();
        });
      })
    })
  }
}

// const f= new DbMongoose()
// const semen1: Usersection[] =[{ coursenumber:"1234", sectionnumber:"weq2341"}, { coursenumber:"124", sectionnumber:"weq2341"}, { coursenumber:"12", sectionnumber:"weq2341"}]
// f.addUser("Mike","mike2",["geo","math"],semen1)
// f.getUserClassses2("Mike")
// f.getClass("574-473-DW","aa")
export default new DbMongoose();



