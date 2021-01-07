// @TODO: configure environment variables
// import dotenv from "dotenv";
// dotenv.config();
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import multer from "multer";

const upload = multer();
const app = express();
const port = "3000";

import passport from "passport";
import { strategy } from "./strategy";

import axios from "axios";
import qs from "qs";

const CLIENT_ID = "10000000000004";
const CLIENT_SECRET =
  "SULCuWVF4E1foAy5GKm7z7hQxWUcOhLZjoBvzSdBKzN3OyNW776oaT1h69O65ozk";

passport.use(strategy);

// app.use(upload.array());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, "test");
});

passport.deserializeUser((id: any, done) => {
  done(null, id);
});

app.post("/", (req: Request, res: Response) => {
  const redirectURL = new URL("http://localhost:8080/login/oauth2/auth");

  redirectURL.searchParams.append("client_id", CLIENT_ID);
  redirectURL.searchParams.append("response_type", "code");
  redirectURL.searchParams.append("redirect_uri", "http://localhost:3000/done");
  redirectURL.searchParams.append(
    "scope",
    "https://canvas.instructure.com/lti/feature_flags/scope/show"
  );

  res.redirect(redirectURL.toString());
});

app.get("/done", (req: Request, res: Response) => {
  const token = axios({
    method: "post",
    url: "http://localhost:8080/login/oauth2/token",
    data: qs.stringify({
      client_id: CLIENT_ID,
      redirect_uri: "http://localhost:3000/done",
      client_secret: CLIENT_SECRET,
      code: req.query.code,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  }).then((res) => console.log(res));

  res.redirect("/final");
});

app.get("/final", (req: Request, res: Response) => {
  res.status(200).send(JSON.stringify("Hello world!"));
});

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
//     );

//     res.redirect(redirectURL);
//   } catch (error) {
//     console.error(error);
//     res.send(500, "Uh oh");
//   }
//   console.error(err);
// });

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
