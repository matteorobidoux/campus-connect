import mongoose from 'mongoose';
import Slot from './slot-schema';
import Section from '../../../types/Section'

const {Schema, model} = mongoose;

const sectionSchema = new Schema<Section>({
    number: String,
    teacher: String,
    schedule: String,
    title: String
}, {collection: 'Sections'});

const Section = model('Section', sectionSchema);
export default Section;