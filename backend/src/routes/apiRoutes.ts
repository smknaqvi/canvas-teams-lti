import { Request, Response, Router } from "express";
import { rootCertificates } from "tls";
import UserController from "../controller/UserController";
const router = Router();

router.route("/test").get((req: Request, res: Response) => {
  console.log(req.headers);
  res.send("Success");
});
router.route("/register").post(UserController.registerUser);

export default router;
