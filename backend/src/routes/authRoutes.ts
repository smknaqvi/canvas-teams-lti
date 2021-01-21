import express, { Request, Response } from "express";

import { OpenidRequest, requiresAuth } from "express-openid-connect";
export const authRoutes = express.Router();

authRoutes.route("").get((req: Request, res: Response) => {
  res.send(
    // compiler doesn't let us declare req as OpenidRequest even though it inherits from Request
    ((req as unknown) as OpenidRequest).oidc.isAuthenticated()
      ? // for now redirect to profile
        res.redirect("/profile")
      : "Logged out"
  );
});

authRoutes
  .route("profile")
  .get(requiresAuth(), (req: Request, res: Response) => {
    res.send(JSON.stringify(((req as unknown) as OpenidRequest).oidc.user));
  });
