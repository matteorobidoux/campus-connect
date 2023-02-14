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


async addUser(nameUser:String, passwd:String, classes: String[]){
  await this.connectDb("test")
  const abie= new User({ name:nameUser, password: passwd, class: classes })
  await abie.save();
  this.disconnectdb();
}


async getAllUsers(){
  await this.connectDb("test")
  const result= await User.find()
  console.log(result)
  this.disconnectdb();
}


}

const x =new  DbMongoose();
// let abo= ["five", "six"]
// x.addUser("abe", "maria",abo);
x.getAllUsers();



