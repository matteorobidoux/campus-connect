import mongoose from 'mongoose';
import { userClassSectionSchema } from './user-section-schema';
import { User } from "../../../../types/User";

const { Schema, model } = mongoose;

const googleTokensSchema = new Schema({
  refresh_token: String,
  access_token: String
})

const userSchema = new Schema<User>({
  name: String,
  sections: [userClassSectionSchema],
  picture: String,
  email: String,
  gid: String,
  googleTokens: googleTokensSchema,
}, { collection: "users", strictQuery: true});

const userModel = model('User', userSchema);
export default userModel;
