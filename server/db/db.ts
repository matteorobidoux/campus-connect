import mongoose from 'mongoose';
import User from "./models/user-schema"


class DbMongoose{
connectDb(dnName: String)
{
  let dbOptions = {
  dbName: ""+dnName
}

  mongoose.connect("mongodb+srv://nenechi:nenechi12@exercise11.cfvsryo.mongodb.net/?retryWrites=true&w=majority", dbOptions);
}

disconnectdb(){
  mongoose.connection.close()
}


async addRandom(){
  await this.connectDb("test")
  const abie= new User({ name: "three", password: "four", class: ["asdasd","dasdadsas"] })
  await abie.save();
  this.disconnectdb();
}



}

const x =new  DbMongoose();
x.addRandom();



