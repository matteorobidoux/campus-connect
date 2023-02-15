import mongoose from 'mongoose';
import Slot from './slot-schema';

const {Schema, model} = mongoose;

const sectionSchema = new Schema({
    section: String,
    teacher: String,
    schedule: [Slot.schema]
}, {collection: 'Sections'});

const Section = model('Section', sectionSchema);
export default Section;