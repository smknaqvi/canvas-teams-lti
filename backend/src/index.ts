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

// app.use((err, req, res, next) => {
//   try {
//     const {
//       body: { launch_presentation_return_url },
//     } = req;

//     const redirectURL = new URL(launch_presentation_return_url);
//     redirectURL.searchParams.append(
//       "lti_msg",
//       "Most things in here don't react well to bullets."
//     );
//     redirectURL.searchParams.append("lti_log", "One ping only.");

//     // only send lti_msg or lti_errormsg, not both
//     redirectURL.searchParams.append(
//       "lti_errormsg",
//       "Who's going to save you, Junior?!"
//     );

//     redirectURL.searchParams.append(
//       "lti_errorlog",
//       "The floor's on fire... see... *&* the chair."
//     );b5

//     res.redirect(redirectURL);
//   } catch (error) {
//     console.error(error);
//     res.send(500, "Uh oh");
//   }
//   console.error(err);
// });

app.listen(PORT, () => {
  console.log(`Listening to requests on ${HOST}`);
});
