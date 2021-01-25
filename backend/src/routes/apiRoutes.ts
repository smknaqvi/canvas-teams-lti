import { Request, Response, Router } from "express";

const router = Router();

router.route("/test").get((req: Request, res: Response) => {
  res.send("Success");
});

export default router;
