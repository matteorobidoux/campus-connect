import mongoose from 'mongoose';

import User from "./models/user-schema"
import Event from './models/event-schema';
import Course from "./models/course-schema";
import Section from "./models/section-schema";
import Usersection from "../../types/Usersection"
import Userclasse from "../../types/Userclass"
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


  async addUser(nameUser: string, passwd: string, classes: string[], sectionsuser: Usersection[]) {
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


  async getUserClassses(nameUser: string) {
    const result = await User.find({ name: nameUser })
    const values = await result[0].sections
    let classlist: Userclasse[] = []

    values.forEach(async function (value) {

      const result = await Course.find({ number: value.coursenumber })
      const title = result[0].title
      const sections = result[0].sections
      
      sections.forEach(section => {
        if (section.number == value.sectionnumber) {
          let classes: Userclasse={
            coursenumber: value.coursenumber,
            teacher: section.teacher,
            coursetitle: title,
            sectionnumber: value.sectionnumber
          };
          console.log(classes)
          classlist.push(classes)
          
        }
      });  
    })
    console.log(classlist)
    return classlist;
  }

  async getClass(courseNumber: string, sectionNumber: string) {
    const result = await Course.find({ number: courseNumber })
    const title = result[0].title
    const sections = result[0].sections
    let classes: Userclasse;

    sections.forEach(section => {
      if (section.number == sectionNumber) {
        classes.coursenumber = courseNumber;
        classes.teacher = section.teacher
        classes.coursetitle = section.title
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

const f = new DbMongoose()
// const semen1: Usersection[] =[{ coursenumber:"410-241-DW", sectionnumber:"00002"}, { coursenumber:"530-292-DW", sectionnumber:"00001"}, { coursenumber:"574-222-DW", sectionnumber:"00001"}]
// f.addUser("Mike","mike2",["geo","math"],semen1)
// f.getUserClassses2("Mike")
f.getUserClassses("Mike")

export default new DbMongoose();




