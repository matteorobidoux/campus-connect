import mongoose from 'mongoose';
import { userClassSectionSchema } from './user-section-schema';
import { User } from "../../../../types/User";
import {UserCompletedEvent} from "../../../../types/UserCompletedEvent"
const { Schema, model } = mongoose;

const userSchema = new Schema<User>({
  name: String,
  password: String,
  completedEvents: Array<UserCompletedEvent>,
  sections: [userClassSectionSchema]
}, { collection: "users" });

const userModel = model('User', userSchema);
export default userModel;
