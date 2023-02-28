import { Request, Response } from "express";
import { generateOAuthClient } from "."; 
import { google } from "googleapis";


export default async function GAuth(req: Request, res: Response) {
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
    console.log(resp);
    
    // token.tokens.
    res.json({status: "all good"});
  } catch {
    res.json({status: "invalid grand"});
  }
}
