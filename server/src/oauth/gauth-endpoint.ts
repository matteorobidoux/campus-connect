import { Request, Response } from "express";
import { generateOAuthClient } from "."; 
import { google } from "googleapis";
import userModel from "../db/models/user-schema";
import { GAuthResponse } from "../../../types/Queries/GAuth"


export default async function GAuth(req: Request, res: Response<GAuthResponse>) {
  try {
    const { code } = req.query as {code: string}
    const oauth2Client = generateOAuthClient();

    const token = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(token.tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2'
    });

    const resp = (await oauth2.userinfo.get()).data;
    const { id: gid, email } = resp;

    if (!gid || !email || !token.tokens.access_token || !token.tokens.refresh_token) {
      res.status(400).json({error: "Couldn't find one of the required infos from google."});
      return;
    }

    // Verify if the gID exists so we can login the user.
    // Otherwise we just want to return the google identification so the user acn register
    console.log({gid})
    const user = await userModel.findOne({gid});
    console.log(user);
    if (user) {
      res.json({user: user.toObject()})
      return;
    }

    res.json({ registerInfo: {
      gid,
      email,
      refresh_token: token.tokens.refresh_token,
      access_token: token.tokens.access_token, }
    });

  } catch(e: any) {
    console.log(e);
    res.status(400).json({error: "invalid grand"});
  }
}
