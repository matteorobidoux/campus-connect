import mongoose from "mongoose";
import { userClassSectionSchema } from "./user-section-schema";
import messageSchema from "./message-schema";
const { Schema, model } = mongoose;

const groupChatSchema = new Schema(
  {
    room: userClassSectionSchema,
    messagesList: [messageSchema],
  },
  { collection: "groupchat", strictQuery: true }
);

const groupChatModel = model("GroupChat", groupChatSchema);
export default groupChatModel;
