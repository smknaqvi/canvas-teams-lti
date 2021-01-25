import jwt from "express-jwt";

import jwks from "jwks-rsa";
import { AUTH0_AUDIENCE, AUTH0_ISSUER, AUTH0_JWKS } from "../config/constants";

export const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${AUTH0_JWKS}`,
  }),
  audience: `${AUTH0_AUDIENCE}`,
  issuer: `${AUTH0_ISSUER}`,
  algorithms: ["RS256"],
});
