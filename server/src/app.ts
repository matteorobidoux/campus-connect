import express, { Response } from "express";

import cors from "cors";
import http from "http";
import { createServer } from "./chat/index";
import {router} from "./routes/route"
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = {
 openapi: '3.0.0',
 info: {
   title: 'Express API for CampusConnect',
   version: '1.0.0',
   description: 'API documentation',
 }
};

const options = {
 swaggerDefinition,
 // Paths to files containing OpenAPI definitions
 apis: ['./routes/route.ts'],
 
};
const swaggerSpec = swaggerJSDoc(options);
const swaggerUi = require('swagger-ui-express');
const port = 8080;

const app = express();


app.use(cors());
app.use(express.json());
app.use("/",router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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
