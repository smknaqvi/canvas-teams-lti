import axios from "axios";
import express, { Request, Response } from "express";
import qs from "qs";
import { CLIENT_ID, CLIENT_SECRET, HOST } from "../config/constants";
export const router = express.Router();

router
  .route("/init")
  .post((req: Request, res: Response) => {
    const redirectURL = new URL("http://localhost:8080/login/oauth2/auth");

    redirectURL.searchParams.append("client_id", CLIENT_ID);
    redirectURL.searchParams.append("response_type", "code");
    redirectURL.searchParams.append("redirect_uri", `${HOST}/auth/init`);
    redirectURL.searchParams.append(
      "scope",
      "https://canvas.instructure.com/lti/feature_flags/scope/show"
    );
    res.redirect(redirectURL.toString());
  })
  .get((req: Request, res: Response) => {
    const token = axios({
      method: "post",
      url: "http://localhost:8080/login/auth2/token",
      data: qs.stringify({
        client_id: CLIENT_ID,
        redirect_uri: `${HOST}/auth/init`,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    res.status(200).redirect("complete");
  });

router.route("/complete").get((req: Request, res: Response) => {
  res.status(200).send(JSON.stringify("Hello world!"));
});

// export {router};
