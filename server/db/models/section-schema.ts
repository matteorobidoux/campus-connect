import mongoose from 'mongoose';
import Slot from './slot-schema';

const {Schema, model} = mongoose;

const sectionSchema = new Schema({
    title: String,
    number: String,
    teacher: String,
    schedule: String
}, {collection: 'Sections'});

const Section = model('Section', sectionSchema);
export default Section;
