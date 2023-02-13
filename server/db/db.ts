import mongoose from 'mongoose';
import User from "./models/user-schema"

let dbOptions = {
  dbName: "test"
}

mongoose.connect("mongodb+srv://nenechi:nenechi12@exercise11.cfvsryo.mongodb.net/?retryWrites=true&w=majority", dbOptions);


const abie= new User({ name: "one", password: "two", class: ["asdasd","dasdadsas"] })
abie.save()