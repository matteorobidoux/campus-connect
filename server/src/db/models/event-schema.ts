import mongoose from 'mongoose';
import { Events } from "../../../../types/Event";
const { Schema, model } = mongoose;

const eventSchema = new Schema<Events>({
  ownerId: String,
  date: Date,
  title: String,
  desc: String,
}, { collection: "events" });

const Event = model('Events', eventSchema);
export default Event;
