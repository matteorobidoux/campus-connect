import mongoose from 'mongoose';

import User from "./models/user-schema"
import Event from './models/event-schema';
import Course from "./models/course-schema";
import Section from "./models/section-schema";
import Usersection from "../../types/Usersection"
import Userclasse from "../../types/Userclass"
import fs = require('fs');
import path = require("path");
import * as config from "../../config.json"
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

  // async addUsertoSection(coursenumb:string) {
  //   Course.findOne({number: coursenumb}, function(err, course) {
  //     course.sections[0].students.push("ho")
  //     course.save()
  //   })
  // }

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
    let classlist: Userclasse[] = []


    values.forEach(async function(value){
      
      const result= await Course.find({number: value.coursenumber})
    const title= result[0].title
    const sections= result[0].sections
    let classes: Userclasse ;
    sections.forEach(section => {
      if(section.number == value.sectionnumber){
        classes.coursenumber=value.coursenumber;
        classes.teacher= section.teacher
        classes.coursetitle=section.title
      }
    });
    console.log(classes)
    
      classlist.push(classes)
    }) 
    console.log(classlist)
    return classlist;
  }
  async getClass(courseNumber:string, sectionNumber:string){
    const result= await Course.find({number: courseNumber})
    const title= result[0].title
    const sections= result[0].sections
    let classes: Userclasse ;
   
    sections.forEach(section => {
      if(section.number == sectionNumber){
        classes.coursenumber=courseNumber;
        classes.teacher= section.teacher
        classes.coursetitle=section.title
      }
    });
    console.log(classes)
    return classes;
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

const f= new DbMongoose()
// const semen1: Usersection[] =[{ coursenumber:"1234", sectionnumber:"weq2341"}, { coursenumber:"124", sectionnumber:"weq2341"}, { coursenumber:"12", sectionnumber:"weq2341"}]
// f.addUser("Mike","mike2",["geo","math"],semen1)
// f.getUserClassses2("Mike")
// f.getClass("410-241-DW","00002")

export default new DbMongoose();




