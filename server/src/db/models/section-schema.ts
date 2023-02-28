import mongoose from 'mongoose';
import Sections from '../../../../types/Section'
import Schedule from '../../../../types/Schedule'
import Events from '../../../../types/Event';
const {Schema, model} = mongoose;

const sectionSchema = new Schema<Sections>({
    schedule: Array<Schedule>,
    events: Array<Events>,
    number: String,
    teacher: String,
    students: [String]
}, {collection: 'Sections'});

const Section = model('Section', sectionSchema);
export default Section;
