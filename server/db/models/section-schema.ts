import mongoose from 'mongoose';
import Slot from './slot-schema';
import Sections from '../../../types/Section'

const {Schema, model} = mongoose;

<<<<<<< HEAD
const sectionSchema = new Schema<Sections>({
=======
const sectionSchema = new Schema({
    title: String,
>>>>>>> 691a6194ca2ba5a7104e38813b5cab58b269926a
    number: String,
    teacher: String,
    schedule: String,
    title: String,
    students: [String]
}, {collection: 'Sections'});

const Section = model('Section', sectionSchema);
export default Section;
