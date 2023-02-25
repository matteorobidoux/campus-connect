import mongoose from 'mongoose';
import Section from './section-schema';
import Courses from '../../../../types/Course'

const {Schema, model} = mongoose;


const courseSchema = new Schema<Courses>({
    title: String,
    number: String,
    sections: [Section.schema]
}, {collection: 'Courses'});

const Course = model('Course', courseSchema);
export default Course;
