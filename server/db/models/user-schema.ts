import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: String,
  password: String,
  class: [String]
}, { collection: "users" });

const User = model('User', userSchema);
export default User;
