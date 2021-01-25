import express, { Request, Response } from "express";

export const apiEndpoints = express.Router();

apiEndpoints.route("/test").get((req: Request, res: Response) => {
  res.send("Success");
});
