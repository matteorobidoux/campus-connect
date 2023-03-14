import mongoose from 'mongoose';
import { userClassSectionSchema } from './user-section-schema';
import {UserMessage}from '../../../../types/Message'
const { Schema, model } = mongoose;


const gorupChatSchema = new Schema({
  messagesList: Array<UserMessage>,
  room: userClassSectionSchema,

}, { collection: "groupchat", strictQuery: true});

const groupChatModel = model('GroupChat', gorupChatSchema);
export default groupChatModel;
