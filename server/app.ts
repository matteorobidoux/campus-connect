import express from "express";
import mongoose from "mongoose";
import DbMongoose from "./db/db"
const app = express();
const port=8080

app.get("/users", (req,res) => {
  const result =  DbMongoose.getAllUsers()
  res.send(result)

})

app.listen(port, ()=>{
  console.log(`at http://localhost:${port}`)
})
export { app};