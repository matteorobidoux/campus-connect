import { Response } from 'express';
import { google } from 'googleapis';

const env = {
  //CHANGE DEPENDING IF DEPLOYING OR LOCAL
  //authUrl: "http://localhost:3000/gauth"
  authUrl: "https://campus-connects-test.azurewebsites.net/gauth"
  //authUrl: "https://campus-connects.azurewebsites.net/gauth"
}

function generateOAuthClient() {
  const oauth2Client = new google.auth.OAuth2(
    "339605005370-fv5vq1stf35b26ftkrh9ugkuju7p68f2.apps.googleusercontent.com",
    "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",
    env.authUrl
  );
  return oauth2Client;
}


function generateAuthUrl(res: Response) {
  const oauth2Client = generateOAuthClient();
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email'
  ];

  console.log('generating url...');
  // Generate a url that asks permissions for the Drive activity scope
  const authorizationUrl = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    /** Pass in the scopes array defined above.
      * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
    scope: scopes,
    // Enable incremental authorization. Recommended as a best practice.
    include_granted_scopes: true
  });

  console.log(authorizationUrl);
  res.json({authorizationUrl});

}

export { generateOAuthClient, generateAuthUrl };
