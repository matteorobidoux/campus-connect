import mongoose from 'mongoose';

import User from "./models/user-schema"
import Event from './models/event-schema';
import Course from "./models/course-schema";
import Section from "./models/section-schema";

import fs from "fs"
import path from "path"
import * as config from "../../config.json"

class DbMongoose{
  name: String
  constructor(name: String){
    this.name=name
    this.connectDb();
  }
connectDb()
{
  let dbOptions = {
  dbName: ""+this.name
}

  mongoose.connect("mongodb+srv://nenechi:nenechi12@exercise11.cfvsryo.mongodb.net/?retryWrites=true&w=majority", dbOptions);
}

disconnectdb(){
  mongoose.connection.close()
}


async addUser(nameUser:String, passwd:String, classes: String[]){
  const abie= new User({ name:nameUser, password: passwd, class: classes })
  await abie.save();
 
}

async addEvent(id:String, date:Date, title: String, desc: String, sectionName:String){
  const abie= new Event({ id:id, date: date, title: title, desc: desc, associatedSection: {name: sectionName}})
  console.log(abie)
  await abie.save();
}

async getUserByClasss(classname: String){
  const result= await User.find({class: classname})
  console.log(result)
  return result;
}

async getAllUsers(){ 
  const result= await User.find()
  console.log(result)
  return result;
}
async getAllEvents(){ 
  const result= await Event.find()
  console.log(result)
  return result;
}

async addAllClasses(){
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

const sex= new DbMongoose("test")
sex.getAllUsers()

export default DbMongoose;



