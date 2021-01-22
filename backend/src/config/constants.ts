const AUTH0_CLIENT_ID = `${process.env.AUTH0_CLIENT_ID}`;
const AUTH0_CLIENT_SECRET = `${process.env.AUTH0_CLIENT_SECRET}`;
const AUTH0_DOMAIN = `${process.env.AUTH0_DOMAIN}`;
export const PORT = process.env.PORT;
export const HOST_ADDRESS = `${process.env.HOST_ADDRESS}:${PORT}`;
export const AUTH_CONFIG = {
  authRequired: false,
  auth0Logout: true,
  secret: `${AUTH0_CLIENT_SECRET}`,
  baseURL: `${HOST_ADDRESS}`,
  clientID: `${AUTH0_CLIENT_ID}`,
  issuerBaseURL: `${AUTH0_DOMAIN}`,
};
