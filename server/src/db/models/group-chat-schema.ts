import mongoose from 'mongoose';
import { userClassSectionSchema } from './user-section-schema';
import { UserMessage }from '../../../../types/MessageUser'
import messageSchema from './messa-schema';
const { Schema, model } = mongoose;


const gorupChatSchema = new Schema({
  room: userClassSectionSchema,
  messagesList: [messageSchema],
}, { collection: "groupchat"});

const groupChatModel = model('GroupChat', gorupChatSchema);
export default groupChatModel;
