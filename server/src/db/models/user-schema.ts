import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import UserSection from './usersection';

const userSchema = new Schema({
  name: String,
  password: String,
  classes: [String],
  sections: [UserSection]
}, { collection: "users" });

const User = model('User', userSchema);
export default User;
