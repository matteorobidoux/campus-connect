import express from "express";
import UserClass from "../../types/Userclass";
import DbMongoose from "./db/db"
const app = express();
const port=8081

app.use(express.json())

app.get("/users", async (_,res) => {
  const result = await DbMongoose.getAllUsers()
  res.json(result)
})

app.get("/classes", async (req,res) => {
  let result: UserClass[] | undefined;
  if(req.query.user !== undefined){
     result = await DbMongoose.getUserClassses(""+req.query.user)
  }
  res.json(result)
})

app.use(express.static('../client/build/'))

app.use(function (_, res) {
  res.status(404).send("404 NOT FOUND");
})


app.listen(port, ()=>{
  console.log(`at http://localhost:${port}`)
})
export { app};
