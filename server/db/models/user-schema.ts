import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import usersection from './usersection';

const userSchema = new Schema({
  name: String,
  password: String,
  classes:[String],
  sections:[usersection]
}, { collection: "users" });

const User = model('User', userSchema);
export default User;
