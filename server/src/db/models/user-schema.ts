import mongoose from 'mongoose';
import { userClassSectionSchema } from './user-section-schema';
import { User } from "../../../../types/User";

const { Schema, model } = mongoose;

const userSchema = new Schema<User>({
  name: String,
  password: String,
  sections: [userClassSectionSchema]
}, { collection: "users" });

const userModel = model('User', userSchema);
export default userModel;
