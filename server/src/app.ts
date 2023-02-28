import express from "express";
import CreateUserBodyParams from "../../types/Queries/CreateUser";
import DbMongoose from "./db/db"
import { GetAllSectionsRequest } from "../../types/Queries/GetAllCourses";
import { LoginRequest } from "../../types/Queries/Login";
import { generateAuthUrl } from "./oauth";
import cors from "cors";
import GAuth from "./oauth/gauth-endpoint";
const app = express();
const port = 8081

app.use(cors())
app.use(express.json())

app.get("/users", async (_,res) => {
  const result = await DbMongoose.getAllUsers()
  res.json(result)
})

app.post("/api/login", async (req, res) => {
  const { name , password }: Partial<LoginRequest> = req.body;
  if (!name || !password) {
    res.sendStatus(400);
  } else {
    res.json(await DbMongoose.login({ name, password }))
  }
})

app.post('/api/addUser', async (req, res) => {
  const body = req.body as CreateUserBodyParams;
  console.log(body);
  res.json({id: await DbMongoose.addUser(body)});
})
//
// app.get('/api/allSections', async (_, res) => {
//   res.json(await DbMongoose.getAllSections())
// })

app.get("/api/getAllSections", async (req, res) => {
  const { userClassSections } = req.query as Partial<GetAllSectionsRequest>;
  if (Array.isArray(userClassSections)) {
    const result = await DbMongoose.getUserClasses(userClassSections);
    res.json(result)
  } else {
    res.sendStatus(400);
  }
})

app.get("/gauth", async (req, res) => {
  console.log("calling gauth.");
  GAuth(req, res);
})

app.get("/api/authenticate", async (req, res) => {
  generateAuthUrl(res);
})


app.use(express.static('../client/build/'));

app.use(function (_, res) {
  res.status(404).send("404 NOT FOUND");
})


app.listen(port, ()=>{
  console.log(`at http://localhost:${port}`)
})
export { app };
