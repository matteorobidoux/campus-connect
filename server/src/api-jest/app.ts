import { GetAllStrippedCourses } from "./../../../types/Queries/Register";
import express, { Response } from "express";
import CreateUserBodyParams from "../../../types/Queries/CreateUser";
import CompletedEventBodyParams from "../../../types/Queries/CompletedEvent";
import RemoveEventBodyParams from "../../../types/Queries/RemoveEvent";
import DbMongoose from "./../db/db";
import {
  GetAllSectionsRequest,
  GetAllSectionsResponse,
} from "../../../types/Queries/GetAllCourses";
import { LoginRequest } from "../../../types/Queries/Login";
import {
  AddEventBody,
  AddEventResponse,
} from "../../../types/Queries/AddEvent";
import { LatestMessage } from "../../../types/Queries/LatestMessage";
import { generateAuthUrl } from "./../oauth";
import cors from "cors";
import GAuth from "./../oauth/gauth-endpoint";
import { UserClassSection } from "../../../types/UserClassSection";
import { UserClass } from "../../../types/UserClass";
jest.mock("./../db/db")
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/login", async (req, res) => {
  const { name, password }: Partial<LoginRequest> = req.body;
  if (!name || !password) {
    res.sendStatus(400);
  } else {
    res.json( jest.spyOn(DbMongoose, "login"));
  }
});

app.post("/api/addUser", async (req, res) => {
  const body = req.body as CreateUserBodyParams;
  console.log(body);
  res.json(jest.spyOn(DbMongoose, "addUser"));
});

app.post("/api/addCompletedEvent", async (req, res) => {
  const { userId, completedEvent } =
    req.body as Partial<CompletedEventBodyParams>;
  if (!userId || !completedEvent) {
    res.sendStatus(400);
  } else {
    res.json({
      id: await jest.spyOn(DbMongoose, "addCompletedEvent"),
    });
  }
});

app.post("/api/removeEvent", async (req, res) => {
  const { eventId, courseNumber, courseSection } =
    req.body as Partial<RemoveEventBodyParams>;
  if (!eventId || !courseNumber || !courseSection) {
    res.sendStatus(400);
  } else {
    res.json({
      id: await jest.spyOn(DbMongoose, "removeEvent")
    });
  }
});

app.post("/api/addEvent", async (req, res: Response<AddEventResponse>) => {
  const body = req.body as Partial<AddEventBody>;
  if (!body.section || !body.event) {
    return res.sendStatus(400);
  }
  console.log(body);

  jest.spyOn(DbMongoose, "addEventToSection")
  res.json({ success: true });
});

app.get("/api/getMostRecentMessage", async (req, res) => {
  const { courseNumber, sectionNumber } =
    req.query as Partial<UserClassSection>;
  if (!courseNumber || !sectionNumber) {
    res.sendStatus(400);
  } else {
    const result =  jest.spyOn(DbMongoose, "getMostRecentMessage");
    console.log(
      "Getting most recent message",
      courseNumber,
      sectionNumber,
      result
    );
    res.json(result);
  }
});

app.get("/api/getAllMessages", async (req, res) => {
  const { courseNumber, sectionNumber } = req.body as Partial<UserClassSection>;
  if (!courseNumber || !sectionNumber) {
    res.sendStatus(400);
  } else {
    const result =  jest.spyOn(DbMongoose, "getAllMessages");;
    res.json(result);
  }
});

app.get("/api/getLatestMessages", async (req, res) => {
  const { room, loadedMsgIndex } = req.body as Partial<LatestMessage>;
  if (!room || !loadedMsgIndex) {
    res.sendStatus(400);
  } else {
    const result = await jest.spyOn(DbMongoose, "getLatestMessages");
    res.json(result);
  }
});

app.get(
  "/api/getAllSections",
  async (req, res: Response<GetAllSectionsResponse>) => {
    const { userClassSections } = req.query as Partial<GetAllSectionsRequest>;
    if(Array.isArray(userClassSections)) {
      const result = await jest.spyOn(DbMongoose, "getUserClasses");
      const result2: UserClass[]=[]
      res.json(result2);
    } else {
      console.log(typeof userClassSections);
      res.sendStatus(400);
    }
  }
);

app.get("/gauth", async (req, res) => {
  console.log("calling gauth.");
  await GAuth(req, res);
  res.sendStatus(200);
});

app.get(
  "/api/getAllStrippedCourses",
  async (req, res: Response<GetAllStrippedCourses>) => {
    const result = await jest.spyOn(DbMongoose, "getAllStrippedCourses");
    if (result && Array.isArray(result) && result.length > 0) {
      res.json({ response: result });
    } else {
      res.sendStatus(400);
    }
  }
);

app.use(express.static("../client/build/"));

app.use(function (_, res) {
  res.status(404).send("404 NOT FOUND");
});

export { app };
