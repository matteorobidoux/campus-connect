import mongoose from 'mongoose';
import { userClassSectionSchema } from './user-section-schema';
import { User } from "../../../../types/User";
import {UserCompletedEvent} from "../../../../types/UserCompletedEvent"
const { Schema, model } = mongoose;

const googleTokensSchema = new Schema({
  refresh_token: String,
  access_token: String
})

const userSchema = new Schema<User>({
  name: String,
<<<<<<< HEAD
  password: String,
  completedEvents: Array<UserCompletedEvent>,
  sections: [userClassSectionSchema]
}, { collection: "users" });
=======
  sections: [userClassSectionSchema],
  email: String,
  gid: String,
  googleTokens: googleTokensSchema,
}, { collection: "users", strictQuery: true});
>>>>>>> 3eacaab68efa39b86d4972754427482ff6b7d230

const userModel = model('User', userSchema);
export default userModel;
