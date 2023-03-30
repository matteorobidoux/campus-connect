import { GetAllStrippedCourses } from "../../../types/Queries/Register";
import express, { Response } from "express";
import CreateUserBodyParams from "../../../types/Queries/CreateUser";
import CompletedEventBodyParams from "../../../types/Queries/CompletedEvent";
import RemoveEventBodyParams from "../../../types/Queries/RemoveEvent";
import DbMongoose from "../db/db";
import {
  GetAllSectionsRequest,
  GetAllSectionsResponse,
} from "../../../types/Queries/GetAllCourses";
import { LoginRequest } from "../../../types/Queries/Login";
import { AddEventBody, AddEventResponse } from "../../../types/Queries/AddEvent";
import { Events } from "../../../types/Event";
import { LatestMessage } from "../../../types/Queries/LatestMessage";
import { generateAuthUrl } from "../oauth";
import GAuth from "../oauth/gauth-endpoint";
import { UserClassSection } from "../../../types/UserClassSection";
 const swaggerJSDoc = require('swagger-jsdoc');
 const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for CampusConnect',
    version: '1.0.0',
    description: 'API documentation',
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.ts']
};
const swaggerSpec = swaggerJSDoc(options);
const swaggerUi = require('swagger-ui-express');

const router= express.Router()

router.use(express.json());

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



router.get("/users", async (_, res) => {
  const result = await DbMongoose.getAllUsers();
  res.json(result);
});

router.post("/api/login", async (req, res) => {
  const { name, password }: Partial<LoginRequest> = req.body;
  if (!name || !password) {
    res.sendStatus(400);
  } else {
    res.json(await DbMongoose.login({ name, password }));
  }
});

router.post("/api/addUser", async (req, res) => {
  const body = req.body as CreateUserBodyParams;
  console.log(body);
  res.json(await DbMongoose.addUser(body));
});

router.post("/api/addCompletedEvent", async (req, res) => {
  const { userId, completedEvent } =
    req.body as Partial<CompletedEventBodyParams>;
  if (!userId || !completedEvent) {
    res.sendStatus(400);
  } else {
    res.json({
      id: await DbMongoose.addCompletedEvent({ userId, completedEvent }),
    });
  }
});

router.post("/api/removeEvent", async (req, res) => {
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

router.post("/api/addEvent", async (req, res: Response<AddEventResponse>) => {
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

router.get("/api/getAllMessages", async (req, res) => {
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

router.get("/api/getLatestMessages", async (req, res) => {
  const { room, messageId } = req.body as Partial<LatestMessage>;
  if (!room || !messageId) {
    res.sendStatus(400);
  } else {
    const result = await DbMongoose.getLatestMessages(room, messageId);
    res.json(result);
  }
});

router.get(
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

router.get("/gauth", async (req, res) => {
  console.log("calling gauth.");
  await GAuth(req, res);
});

router.get("/api/authenticate", async (req, res) => {
  generateAuthUrl(res);
});

router.get(
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



export { router };