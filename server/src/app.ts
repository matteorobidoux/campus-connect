import { GetAllStrippedCourses } from "./../../types/Queries/Register";
import express, { Response } from "express";
import CreateUserBodyParams from "../../types/Queries/CreateUser";
import CompletedEventBodyParams from "../../types/Queries/CompletedEvent";
import RemoveEventBodyParams from "../../types/Queries/RemoveEvent";
import DbMongoose from "./db/db";
import {
  GetAllSectionsRequest,
  GetAllSectionsResponse,
} from "../../types/Queries/GetAllCourses";
import { LoginRequest } from "../../types/Queries/Login";
import { AddEventBody, AddEventResponse } from "../../types/Queries/AddEvent";
import { Events } from "../../types/Event";
import { LatestMessage } from "../../types/Queries/LatestMessage";
import { generateAuthUrl } from "./oauth";
import cors from "cors";
import GAuth from "./oauth/gauth-endpoint";
import http from "http";
import { createServer } from "./chat/index";
import { UserClassSection } from "../../types/UserClassSection";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get("/users", async (_, res) => {
  const result = await DbMongoose.getAllUsers();
  res.json(result);
});

app.post("/api/login", async (req, res) => {
  const { name, password }: Partial<LoginRequest> = req.body;
  if (!name || !password) {
    res.sendStatus(400);
  } else {
    res.json(await DbMongoose.login({ name, password }));
  }
});

app.post("/api/addUser", async (req, res) => {
  const body = req.body as CreateUserBodyParams;
  console.log(body);
  res.json(await DbMongoose.addUser(body));
});

app.post("/api/addCompletedEvent", async (req, res) => {
  const { userName, completedEvent } =
    req.body as Partial<CompletedEventBodyParams>;
  if (!userName || !completedEvent) {
    res.sendStatus(400);
  } else {
    res.json({
      id: await DbMongoose.addCompletedEvent({ userName, completedEvent }),
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
      id: await DbMongoose.removeEvent({
        eventId,
        courseNumber,
        courseSection,
      }),
    });
  }
});

app.post("/api/addEvent", async (req, res: Response<AddEventResponse>) => {
  const body = req.body as Partial<AddEventBody>;
  if (!body.section || !body.event) {
    return res.sendStatus(400);
  }
  console.log(body);

  await DbMongoose.addEventToSection(
    body.section.courseNumber,
    body.section.sectionNumber,
    body.event
  );
  res.json({ success: true });
});

app.get("/api/getAllMessages", async (req, res) => {
  const { courseNumber, sectionNumber } = req.body as Partial<UserClassSection>;
  if (!courseNumber || !sectionNumber) {
    res.sendStatus(400);
  } else {
    const result = await DbMongoose.getAllMessages({
      courseNumber,
      sectionNumber,
    });
    res.json(result);
  }
});

app.get("/api/getLatestMessages", async (req, res) => {
  const room = req.query.room as UserClassSection;
  const loadedMsgIndex = req.query.loadedMsgIndex as unknown as number;
  //console.log(room,loadedMsgIndex);
  if (!room || !loadedMsgIndex) {
    res.sendStatus(400);
  } else {
    const result = await DbMongoose.getLatestMessages(room, loadedMsgIndex);
    res.json(result);
  }
});

app.get(
  "/api/getAllSections",
  async (req, res: Response<GetAllSectionsResponse>) => {
    const { userClassSections } = req.query as Partial<GetAllSectionsRequest>;
    if (Array.isArray(userClassSections)) {
      const result = await DbMongoose.getUserClasses(userClassSections);
      res.json(result);
    } else {
      res.sendStatus(400);
    }
  }
);

app.get("/gauth", async (req, res) => {
  console.log("calling gauth.");
  await GAuth(req, res);
});

app.get("/api/authenticate", async (req, res) => {
  generateAuthUrl(res);
});

app.get(
  "/api/getAllStrippedCourses",
  async (req, res: Response<GetAllStrippedCourses>) => {
    const result = await DbMongoose.getAllStrippedCourses();
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

const server = http.createServer(app);
createServer(server);

server.listen(port, () => {
  console.log(`at http://localhost:${port}`);
});

async function closeServer() {
  server.close();
}

export { app, closeServer };
