import mongoose from 'mongoose';
import Section from './section-schema';

const {Schema, model} = mongoose;


const courseSchema = new Schema({
    title: String,
    number: String,
    sections: [Section.schema]
}, {collection: 'Courses'});

const Course = model('Course', courseSchema);
export default Course;
