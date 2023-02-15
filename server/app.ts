import express from "express";
import mongoose from "mongoose";
const app = express();




let dbOptions = {
  dbName: "test"
}

mongoose.connect("mongodb+srv://nenechi:nenechi12@exercise11.cfvsryo.mongodb.net/?retryWrites=true&w=majority", dbOptions);

export { app};