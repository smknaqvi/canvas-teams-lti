import express, { Request, Response } from "express";

export const apiRoutes = express.Router();

apiRoutes.route("/test").get((req: Request, res: Response) => {
  res.send("Success");
});
