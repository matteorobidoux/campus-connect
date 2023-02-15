import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const associatedSecSchema=new Schema({name:String})
const AssociatedSection=mongoose.model('AssociatedSection', associatedSecSchema)
const eventSchema = new Schema({
  id: String,
  date: Date,
  title: String,
  desc: String,
  associatedSection: associatedSecSchema
}, { collection: "events" });

const Event = model('Event', eventSchema);
export default Event;
