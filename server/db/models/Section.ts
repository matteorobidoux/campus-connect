import mongoose from 'mongoose';

const {Schema, model} = mongoose;

const sectionSchema = new Schema({
    section: String,
    teacher: String,
    schedule: String
}, {collection: 'Sections'});

const Section = model('Section', sectionSchema);
export default Section;