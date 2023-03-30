import express, { Response } from "express";

import cors from "cors";
import http from "http";
import { createServer } from "./chat/index";
import {router} from "./routes/route"

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use("/",router);

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
