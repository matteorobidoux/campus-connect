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
    try{

      const result = await User.find({ name: nameUser })
      const values = await result[0].sections
     
      let arrayclass: Userclasse[] =[];
      let classlist=arrayclass;
      const test = async()=>{
        let arrayclass: Userclasse[] =[];
        let classlist=arrayclass;
        for( const x of values){
          const result = await Course.find({ number: x.coursenumber });
          const title = result[0].title;
          const sections = result[0].sections;
          let userclass: Userclasse;
          sections.forEach(section => {
            if (section.number == x.sectionnumber) {
              let classes: Userclasse = {
                coursenumber: x.coursenumber,
                teacher: section.teacher,
                coursetitle: title,
                sectionnumber: x.sectionnumber
              };
              userclass = classes;
              // console.log(classes)
              classlist.push(classes);
              console.log(classlist.length);
  
            }
        });            
      }
     return classlist;
    }
      classlist=await test()
      return classlist
  }catch(err){
      console.log(err)
    }
  }
 
  async getClass(courseNumber: string, sectionNumber: string) {
    const result = await Course.find({ number: courseNumber })
    const title = result[0].title
    const sections = result[0].sections
    

    sections.forEach(section => {
      if (section.number == sectionNumber) {
        let classes: Userclasse={
          coursenumber: courseNumber,
          teacher: section.teacher,
          coursetitle: title,
          sectionnumber: sectionNumber
        };
        console.log(classes) 
        return classes;
      }
    });
   
   
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
// f.getUserClassses("Mike")

export default new DbMongoose();




