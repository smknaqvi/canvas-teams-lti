import "./config/config";
import {
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN,
  HOST_ADDRESS,
  PORT,
} from "./config/constants";
import express, { Request, Response } from "express";

import { auth, OpenidRequest } from "express-openid-connect";

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: `${AUTH0_CLIENT_SECRET}`,
  baseURL: `${HOST_ADDRESS}`,
  clientID: `${AUTH0_CLIENT_ID}`,
  issuerBaseURL: `${AUTH0_DOMAIN}`,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
// TODO: Run server over https://, see https://auth0.com/docs/libraries/secure-local-development
app.get("/", (req: Request, res: Response) => {
  res.send(
    // compiler doesn't let us declare req as OpenidRequest even though it inherits from Request
    ((req as unknown) as OpenidRequest).oidc.isAuthenticated()
      ? "Logged in"
      : "Logged out"
  );
});

app.listen(PORT, () => {
  console.log(`Listening to requests on ${HOST_ADDRESS}`);
});

/*
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});
*/
