import axios from "axios";
import express, { Request, Response } from "express";
import qs from "qs";
import {
  DEV_CLIENT_ID,
  DEV_LTI_KEY,
  HOST_ADDRESS,
  CANVAS_ADDRESS,
} from "../config/constants";
export const authRoutes = express.Router();

authRoutes.route("/init").post((req: Request, res: Response) => {
  const redirectURL = new URL(`${CANVAS_ADDRESS}/login/oauth2/auth`);

  redirectURL.searchParams.append("client_id", DEV_CLIENT_ID);
  redirectURL.searchParams.append("response_type", "code");
  redirectURL.searchParams.append(
    "redirect_uri",
    `${HOST_ADDRESS}/auth/redirect`
  );
  redirectURL.searchParams.append(
    "scope",
    "https://canvas.instructure.com/lti/feature_flags/scope/show"
  );
  res.redirect(redirectURL.toString());
});
authRoutes.route("/redirect").get((req: Request, res: Response) => {
  const token = axios({
    method: "post",
    url: `${CANVAS_ADDRESS}/login/oauth2/token`,
    data: qs.stringify({
      client_id: DEV_CLIENT_ID,
      redirect_uri: `${HOST_ADDRESS}/auth/redirect`,
      client_secret: DEV_LTI_KEY,
      code: req.query.code,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
    // @TODO: handle token sent in response
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  res.status(200).redirect("complete");
});

authRoutes.route("/complete").get((req: Request, res: Response) => {
  res.status(200).send(JSON.stringify("Hello world!"));
});
