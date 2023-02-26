import mongoose from 'mongoose';

import User from "./models/user-schema"
import Event from './models/event-schema';
import Course from "./models/course-schema";
import UserSection from "../../../types/Usersection"
import UserClass from "../../../types/Userclass"
import GetAllCoursesResponse from "../../../types/Queries/GetAllCourses"
import CreateUserBodyParams from "../../../types/Queries/CreateUser";
//
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


  async addUser({nameUser, passwd, classes, sectionsuser}: CreateUserBodyParams): Promise<string> {
    const userModel = new User({ name: nameUser, password: passwd, classes: classes, sections: sectionsuser })
    console.log(userModel)
    const resp = await userModel.save();
    return resp.id!
  }

  async addEvent(id: string, date: Date, title: string, desc: string, sectionName: string) {
    const eventModel = new Event({ id: id, date: date, title: title, desc: desc, associatedSection: { name: sectionName } })
    console.log(eventModel)
    await eventModel.save();
  }

  // async addUsertoSection(coursenumb:string) {
  //   Course.findOne({number: coursenumb}, function(err, course) {
  //     course.sections[0].students.push("ho")
  //     course.save()
  //   })
  // }


  //Get all the classes for the user based on UserName
  async getUserClassses(nameUser: string) {
    try {

      const result = await User.find({ name: nameUser })
      const values = result[0].sections
      let arrayClass: UserClass[] = [];
      let classList = arrayClass;
      const test = async () => {
        let arrayClass: UserClass[] = [];
        let classList = arrayClass;
        for (const x of values) {
          const result = await Course.find({ number: x.coursenumber });
          const title = result[0].title;
          const sections = result[0].sections;
          sections.forEach(section => {
            if (section.number == x.sectionnumber) {
              let classes: UserClass = {
                coursenumber: x.coursenumber,
                teacher: section.teacher,
                coursetitle: title,
                sectionnumber: x.sectionnumber,
                classevents: section.events
              };
              classList.push(classes);
            }
          });
        }
        return classList;
      }
      classList = await test()
      return classList
    } catch (err) {
      console.log(err)
    }
  }


  //Experimental to keep My need to remove Later
  async getClass(courseNumber: string, sectionNumber: string) {
    const result = await Course.find({ number: courseNumber })
    const title = result[0].title
    const sections = result[0].sections
    sections.forEach(section => {
      if (section.number == sectionNumber) {
        let classes: UserClass = {
          coursenumber: courseNumber,
          teacher: section.teacher,
          coursetitle: title,
          sectionnumber: sectionNumber,
          classevents: section.events
        };
        console.log(classes)
        return classes;
      }
    });
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

  async getAllCourses(): Promise<GetAllCoursesResponse> {
    const mongoResp = await Course.find();
    const result = mongoResp.map(r => ({
      title: r.title,
      sections: r.sections.map(s => ({teacher: s.teacher, number: s.number})),
      id: r.id as string,
    }))

    console.log(result);

    return result;
  }

}

export default new DbMongoose();
