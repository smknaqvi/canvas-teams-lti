import "./config/config";

import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import jwt from "express-jwt";
import jwks from "jwks-rsa";
import { HOST_ADDRESS, PORT } from "./config/constants";
import { apiRoutes } from "./routes/api";
const app = express();

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
