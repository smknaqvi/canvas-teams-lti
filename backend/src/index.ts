import "./config/config";
import {
  CANVAS_ADDRESS,
  DEV_CLIENT_ID,
  DEV_LTI_KEY,
  PORT,
} from "./config/constants";
import { Request, Response } from "express";

import { Provider } from "ltijs";
// may be able to use the types from sequelize, for now ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Database = require("ltijs-sequelize");

// @TODO: configure database and abstract constants
const db = new Database(
  "test",
  "user",
  "password",

  {
    host: "localhost",
    dialect: "postgres",
    logging: true,
  }
);

// compiles incorrectly
const lti = new Provider(
  `${DEV_LTI_KEY}`,
  {
    // shouldn't have to specify url here, might have accessed property incorrectly
    url: db.host,
    plugin: db,
  },
  {
    appUrl: "/",
    loginUrl: "/login",
    cookies: {
      secure: false,
      sameSite: "",
    },
    https: false,
  }
);

// @TODO: use Idtoken type for token
lti.onConnect((token: any, req: Request, res: Response) => {
  console.log(token);
  return res.send("It's alive!");
});

const setup = async () => {
  await lti.deploy({ port: Number(PORT) });
  await lti.registerPlatform({
    url: "https://canvas.instructure.com",
    name: "Platform Name",
    clientId: `${DEV_CLIENT_ID}`,
    authenticationEndpoint: `${CANVAS_ADDRESS}/api/lti/authorized_redirect`,
    accesstokenEndpoint: `${CANVAS_ADDRESS}/login/oauth2/token`,
    authConfig: { method: "JWK_KEY", key: "https://platform.url/keyset" },
  });
};

setup();
