import mongoose from 'mongoose';
import User from "./models/user-schema"


class DbMongoose{
  name: String
  constructor(name: String){
    this.name=name
  }
connectDb()
{
  let dbOptions = {
  dbName: ""+this.name
}

  mongoose.connect("mongodb+srv://nenechi:nenechi12@exercise11.cfvsryo.mongodb.net/?retryWrites=true&w=majority", dbOptions);
}

disconnectdb(){
  mongoose.connection.close()
}


async addUser(nameUser:String, passwd:String, classes: String[]){
  await this.connectDb()
  const abie= new User({ name:nameUser, password: passwd, class: classes })
  await abie.save();
  this.disconnectdb();
}

async getUserByClasss(classname: String){
  await this.connectDb()
  const result= await User.find({class: classname})
  console.log(result)
  this.disconnectdb();
  return result;
}

async getAllUsers(){
  await this.connectDb()
  const result= await User.find()
  console.log(result)
  this.disconnectdb();
  return result;
}


}


const a = new DbMongoose("test")
a.getUserByClasss("asdasd")
export default DbMongoose;



