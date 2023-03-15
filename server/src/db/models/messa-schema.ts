import mongoose from 'mongoose';
import { UserMessage }from '../../../../types/MessageUser'
const { Schema, model } = mongoose;


const messageSchema = new Schema<UserMessage>({
  user: {userName: String, _id: String},
  date: Date,
  message: String,
});

export default messageSchema;
