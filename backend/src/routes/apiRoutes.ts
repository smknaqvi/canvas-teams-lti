import { Request, Response, Router } from "express";
import { rootCertificates } from "tls";
import {
  registerUser,
  addUserToProject,
  createProject,
} from "../controller/UserController";
// import UserController from "../controller/UserController";
const router = Router();

router.route("/test").get((req: Request, res: Response) => {
  console.log(req.headers);
  res.send("Success");
});
router.route("/register").post(registerUser);
router.route("/createProject").post(createProject);
router.route("/enrolUser").post(addUserToProject);

export default router;
