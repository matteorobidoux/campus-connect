import mongoose from 'mongoose';
import Course from "./models/Course";
import Section from "./models/Section";

import fs from "fs"
import path from "path"

const dbOptions = {
  dbName: "test"
}

mongoose.connect("mongodb+srv://nenechi:nenechi12@exercise11.cfvsryo.mongodb.net/?retryWrites=true&w=majority", dbOptions);

const jsonsInDir = fs.readdirSync("./me");
jsonsInDir.forEach(file => {
    const fileData = fs.readFileSync(path.join("./me", file));
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