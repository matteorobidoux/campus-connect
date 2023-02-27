import Event from "../../../../types/Event";
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const eventSchema = new Schema({
  id: String,
  date: Date,
  title: String,
  desc: String,
}, { collection: "events" });

const Event = model('Event', eventSchema);
export default Event;
