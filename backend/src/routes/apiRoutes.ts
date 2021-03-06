import { Request, Response, Router } from "express";
import { rootCertificates } from "tls";
import {
  registerUser,
  addUserToProject,
  createProject,
} from "../controller/UserController";

const router = Router();

// @TODO determine better route names
router.route("/test").get((req: Request, res: Response) => {
  console.log(req.headers);
  res.send("Success");
});
router.route("/user").post(registerUser);
router.route("/project").post(createProject);
router.route("/enrolUser").post(addUserToProject);

export default router;
