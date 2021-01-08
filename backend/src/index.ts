// @TODO: configure environment variables
// import dotenv from "dotenv";
// dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import { authRoutes } from "./routes/authRoutes";
import passport from "passport";
import { strategy } from "./strategy";
import { HOST, PORT } from "./config/constants";

const app = express();

// Middleware

passport.use(strategy);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

// @TODO: Add db so users can be serialized to and from the session
passport.serializeUser(
  (user: Express.User, done: (err: any, user?: Express.User) => void) => {
    done(null, "test");
  }
);

passport.deserializeUser(
  (id: number, done: (err: any, user?: Express.User) => void) => {
    done(null, id);
  }
);

// Routes
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Listening to requests on ${HOST}`);
});
