import "./config/config";
import {
  CANVAS_ADDRESS,
  DB_PASS,
  DB_TABLE,
  DB_USER,
  DEV_CLIENT_ID,
  DEV_LTI_KEY,
  PORT,
  PRIVATE_KEY,
} from "./config/constants";
import { Request, Response } from "express";
// @TODO: make exception only for provider.setup
import { Provider } from "ltijs";
// may be able to use the types from sequelize, for now ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Database = require("ltijs-sequelize");

// @TODO: configure database and abstract constants
const db = new Database(
  `${DB_TABLE}`,
  `${DB_USER}`,
  `${DB_PASS}`,

  {
    host: "localhost",
    dialect: "postgres",
    logging: true,
  }
);

const lti = Provider.setup(
  `${DEV_LTI_KEY}`,
  {
    plugin: db,
  },
  {
    appUrl: "/",
    loginUrl: "/login",
    cookies: {
      secure: true,
      sameSite: "none",
    },
    devMode: false,
  }
);

// @TODO: use Idtoken type for token
lti.onConnect((token: any, req: Request, res: Response) => {
  console.log(token);
  return res.send("It's alive!");
});

lti.onInvalidToken(async (req: Request, res: Response, next: () => any) => {
  console.log("QUERY", req.query, "PARAMS", req.params);
  return res.status(401).send(res.locals.err);
});
const setup = async () => {
  await lti.deploy({ port: Number(PORT) });
  await lti.registerPlatform({
    url: "http://dogs.docker",
    name: "Platform Name",
    clientId: `${DEV_CLIENT_ID}`,
    authenticationEndpoint: `${CANVAS_ADDRESS}/api/lti/authorize_redirect`,
    accesstokenEndpoint: `${CANVAS_ADDRESS}/login/oauth2/token`,
    authConfig: { method: "JWK_SET", key: `${PRIVATE_KEY}` },
  });
};

setup();
