import "./config/config";

import { AUTH_CONFIG, HOST_ADDRESS, PORT } from "./config/constants";
import express from "express";

import { auth } from "express-openid-connect";
import { authRoutes } from "./routes/authRoutes";

const app = express();

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(AUTH_CONFIG));

app.use("/", authRoutes);

app.set("trust proxy", true);

app.listen(PORT, () => {
  console.log(`Listening to requests on ${HOST_ADDRESS}`);
});
