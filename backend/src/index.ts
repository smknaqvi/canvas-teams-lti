import "./config/config";

import { HOST_ADDRESS, PORT } from "./config/constants";
import express from "express";
import jwt from "express-jwt";
import jwks from "jwks-rsa";
import { apiRoutes } from "./routes/api";
const app = express();

// middleware

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-rrq-glwv.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "teams_backend",
  issuer: "https://dev-rrq-glwv.us.auth0.com/",
  algorithms: ["RS256"],
});

app.use(jwtCheck);

app.use("/api", apiRoutes);

app.set("trust proxy", true);

app.listen(PORT, () => {
  console.log(`Listening to requests on ${HOST_ADDRESS}`);
});
