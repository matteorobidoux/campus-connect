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
import { BlobServiceClient } from "@azure/storage-blob";
import fileUpload from "express-fileupload";

require("dotenv").config({ path: __dirname + "/.env" });

const sasToken = process.env.AZURE_SAS;
const storageAccountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const containerName = "blobstorage";
const blobService = new BlobServiceClient(
  `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
);
const containerClient = blobService.getContainerClient(containerName);

const router= express.Router()

router.use(express.json());
router.use(fileUpload());



router.post("/api/login", async (req, res) => {
  const { name, password }: Partial<LoginRequest> = req.body;
  if (!name || !password) {
    res.sendStatus(400);
  } else {
    res.json(await DbMongoose.login({ name, password }));
  }
});


/**
 * @swagger
 * /api/addUser:
 *  post:
 *    summary: Adds an User to the Db
 *    description: Returns Boolean true
 *    parameters:
 *      - in: query 
 *        name: CreateUserBodyParams
 *        schema:
 *          type: object
 *          properties:
 *            gid:
 *               type: string
 *               example: "somegid"
 *            sections:
 *                    type: array
 *                    example:  [ { courseNumber: "574-453-DW", sectionNumber: "00001"} ]
 *            name:
 *                type: string
 *                example: Neils Hambile
 *            picture:
 *                   type: string
 *                   example: url.blob.jpg 
 *            email:
 *                 type: string
 *                   example: ahaha@ahaha.com
 *            
 *        description: Adding event id to the userCompletedEvent Array 
 *    responses:
 *      200:
 *         description: An Event was succesfully removed.
 */
router.post("/api/addUser", async (req, res) => {
  const body = req.body as CreateUserBodyParams;
  console.log(body);
  res.json(await DbMongoose.addUser(body));
});



/**
 * @swagger
 * /api/addCompletedEvent:
 *  post:
 *    summary: Adds an Event to the specific course
 *    description: Returns Boolean true
 *    parameters:
 *      - in: query 
 *        name: RemoveEventBodyParams
 *        schema:
 *          type: object
 *          properties:
 *            userId:
 *               type: string
 *               example: "someuserId"
 *            UserCompletedEvent:
 *                    type: object
 *                    example:  {id: "someid", date: "2023-03-28T23:00:10.537+00:00"}
 *        description: Adding event id to the userCompletedEvent Array 
 *    responses:
 *      200:
 *         description: An Event was succesfully removed.
 */
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




/**
 * @swagger
 * /api/uploadBlob:
 *  post:
 *    summary: changes profile picture for user
 *    description: Returns Boolean true
 *    responses:
 *      200:
 *         description: Image have been  changed.
 */
router.post("/api/uploadBlob", async (req, res) => {
  if (req.files !== null && req.files !== undefined) {
    if (!(req.files.file instanceof Array)) {
      const file: fileUpload.UploadedFile = req.files.file;
      const blobName = req.files.file.name;
      const blobClient = containerClient.getBlockBlobClient(blobName);
      const options = { blobHTTPHeaders: { blobContentType: file.mimetype } };
      console.log("Saving File to Azure Blob Storage");
      await blobClient
        .uploadData(file.data, options)
        .then((data: { _response: any }) => console.log(data, data._response));
      const uploadedUrl: URL = new URL(
        `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blobName}`
      );
      await DbMongoose.changeUserImage({
        id: req.body.id,
        picture: uploadedUrl.toString(),
      });
      return res
        .status(200)
        .json({ status: "success", url: uploadedUrl.toString() });
    }
  }
});

/**
 * @swagger
 * /api/getMostRecentMessage:
 *  post:
 *    summary: Get the last message from Chat
 *    description: Returns Boolean true
 *    parameters:
 *      - in: query 
 *        name: UserClassSection
 *        schema:
 *          type: object
 *          properties:
 *            courseNumber:
 *                    type: string
 *                    example:  "574-453-DW"
 *            sectionNumber:
 *                     type: string
 *                     example: "00001"
 *        description: Gets Latest Message (Last message Sent) 
 *    responses:
 *      200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:  { user: { userName: "TestName", _id: "010101010101"}, date: "2023-03-28T23:00:10.537+00:00", message: "Swagger"}
 *         description: Retrieves the lastest messages from the chat.
 */
router.get("/api/getMostRecentMessage", async (req, res) => {
  const { courseNumber, sectionNumber } =
    req.query as Partial<UserClassSection>;
  if (!courseNumber || !sectionNumber) {
    res.sendStatus(400);
  } else {
    const result = await DbMongoose.getMostRecentMessage({
      courseNumber,
      sectionNumber,
    });
    console.log(
      "Getting most recent message",
      courseNumber,
      sectionNumber,
      result?.message
    );
    res.json(result);
  }
});

/**
 * @swagger
 * /api/RemoveEvent:
 *  post:
 *    summary: Adds an Event to the specific course
 *    description: Returns Boolean true
 *    parameters:
 *      - in: query 
 *        name: RemoveEventBodyParams
 *        schema:
 *          type: object
 *          properties:
 *            eventId:
 *               type: string
 *               example: "5td4ageayuadahwywe"
 *            courseNumber:
 *                    type: string
 *                    example:  "574-453-DW"
 *            courseSection:
 *                     type: string
 *                     example: "00001"
 *        description: RemoveEventBody has all the required stuff to remove event  
 *    responses:
 *      200:
 *         description: An Event was succesfully removed.
 */
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


/**
 * @swagger
 * /api/addEvent:
 *  post:
 *    summary: Adds an Event to the specific course
 *    description: Returns Boolean true
 *    parameters:
 *      - in: query 
 *        name: AddEventBody
 *        schema:
 *          type: object
 *          properties:
 *            section:
 *               type: object
 *               example: {{courseNumber: "574-453-DW", sectionNumber:  "00001"}}
 *            event:
 *             type: object
 *             example: { owenerid: "someownerid", date: "2023-03-30T04:00:00.000+00:00", title: "Swagger Post",desc: "swagger post",courseTitle: "WebDev"}
 *        description: Section containes courseNumber and section, event is the event objet to be added    
 *    responses:
 *      200:
 *         description: An Event was succesfully added.
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *               example: true
 */
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


/**
 * @swagger
 * /api/getAllMessages:
 *  get:
 *    summary: Get all Messages
 *    description: Returns a array with All Messages
 *    parameters:
 *      - in: query 
 *        name: UserClassSection
 *        schema:
 *          type: object
 *          properties:
 *            data:
 *               type: object
 *               example: {room: {courseNumber: "574-453-DW", sectionNumber:  "00001"}, messageIndex: 0}
 *        description: The courseNumber and sectionNumber of the group chat to retrieve themessages      
 *    responses:
 *      200:
 *         description: A list of all Messages In the group Chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                    type: array
 *                    example: [ { user: { userName: "TestName", _id: "010101010101"}, date: "2023-03-28T23:00:10.537+00:00", message: "Swagger"} ]
 */
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



/**
 * @swagger
 * /api/getLatestMessages:
 *  get:
 *    summary: Get LastestMessages
 *    description: Returns an array with last 15 Messages from the given message Index
 *    parameters:
 *      - in: query 
 *        name: LatestMessage
 *        schema:
 *          type: object
 *          properties:
 *            data:
 *               type: object
 *               example: {room: {courseNumber: "574-453-DW", sectionNumber:  "00001"}, messageIndex: 0}
 *        description: The courseNumber and sectionNumber of the group chat       
 *    responses:
 *      200:
 *         description: A list of Messages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                    type: array
 *                    example: [ { user: { userName: "TestName", _id: "010101010101"}, date: "2023-03-28T23:00:10.537+00:00", message: "Swagger"} ]
 */
router.get("/api/getLatestMessages", async (req, res) => {
  const room = req.query.room as UserClassSection;
  const loadedMsgIndex = req.query.loadedMsgIndex as unknown as number;
  if (!room || !loadedMsgIndex) {
    res.sendStatus(400);
  } else {
    const result = await DbMongoose.getLatestMessages(room, loadedMsgIndex);
    res.json(result);
  }
});


/**
 * @swagger
 * /api/getAllSections:
 *  get:
 *    summary: Get All user class Sections
 *    description: Returns an array with All user's classes based on the UserClassSection[]
 *    parameters:
 *      - in: query 
 *        name: UserClassSections
 *        schema:
 *          type: object
 *          properties:
 *            data:
 *               type: array
 *               example: [ { sections: {courseNumber: "574-453-DW", sectionNumber:  "00001"} } ]
 *        description: The array Containing courseNumber and section where user belongs       
 *    responses:
 *      200:
 *         description: A list of all User Classes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                    type: array
 *                    example: [ {courseNumber: "574-453-DW", courseTitle: "StoryBoard", section: { number: "00001", schedule: [ {begin: "9:00 AM", day: "Monday", duration: { hours: 4, minutes: 0}, end: "1:00 PM" } ]  }, teacher: "Kate Morrison" } ]
 */
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


/**
 * @swagger
 * /gauth:
 *  get:
 *    summary: Google Authorization req / res 
 *    description: Returns an user object
 *    parameters:
 *      - in: query 
 *        name: Code
 *        schema:
 *          type: object
 *          properties:
 *            data:
 *               type: string
 *               example: "somecredentialcodeforthegoogleauths"      
 *    responses:
 *      200:
 *         description: An User object info response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                    type: object
 *                    example: { gid: "12342", email: "a@hot.com", picture: "url",}
 */
router.get("/gauth", async (req, res) => {
  console.log("calling gauth.");
  await GAuth(req, res);
});

/**
 * @swagger
 * /api/authenticate:
 *  get:
 *    summary: authetificates the user
 *    description: Returns a array with last 15 Messages from the given message Index    
 *    responses:
 *      200:
 *         description: Authorization Url
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                    type: string
 *                    example: "thisisasampleurlauthoriationurl.auth.com"
 */
router.get("/api/authenticate", async (req, res) => {
  generateAuthUrl(res);
});



/**
 * @swagger
 * /api/getAllStrippedCourses:
 *  get:
 *    summary: Get LastestMessages
 *    description: Returns a array with last 15 Messages from the given message Index
 *    parameters:
 *      - in: query 
 *        name: LatestMessage
 *        schema:
 *          type: object
 *          properties:
 *            data:
 *               type: object
 *               example: {room: {courseNumber: "a", sectionNumber:  "00001"}, messageIndex: 0}
 *        description: The courseNumber and sectionNumber of the group chat       
 *    responses:
 *      200:
 *         description: A list of Messages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                    type: array
 *                    example: ["a"]
 */
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