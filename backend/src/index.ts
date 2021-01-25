import "./config/config";

import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { HOST_ADDRESS, PORT } from "./config/constants";
import { apiEndpoints } from "./endpoints/api";
import { jwtCheck } from "./middleware/auth";
const app = express();

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(jwtCheck);

// endpoints
app.use("/api", apiEndpoints);

app.listen(PORT, () => {
  console.log(`Listening to requests on ${HOST_ADDRESS}:${PORT}`);
});
