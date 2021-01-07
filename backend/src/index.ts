// @TODO: configure environment variables
// import dotenv from "dotenv";
// dotenv.config();
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import multer from "multer";
import { CLIENT_ID, CLIENT_SECRET, HOST, PORT} from "./config/constants";
import { router as authRoutes } from './routes/auth';

const upload = multer();
const app = express();
// const port = "3000";

import passport from "passport";
import { strategy } from "./strategy";



passport.use(strategy);

// app.use(upload.array());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

// @TODO: Add db so users can be serialized to and from the session
passport.serializeUser((user, done) => {
  done(null, "test");
});

passport.deserializeUser((id: any, done) => {
  done(null, id);
});

app.use('/auth', authRoutes);

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
