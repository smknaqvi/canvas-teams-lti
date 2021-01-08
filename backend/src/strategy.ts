import LTIStrategy from "passport-lti";
import { CLIENT_ID, CLIENT_SECRET } from "./config/constants";

export const strategy = new LTIStrategy(
  {
    consumerKey: CLIENT_ID,
    consumerSecret: CLIENT_SECRET,
    // pass the req object to callback
    // passReqToCallback: true,
    // https://github.com/omsmith/ims-lti#nonce-stores
    // nonceStore: new RedisNonceStore('testconsumerkey', redisClient)
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (lti: any, done: any) => {
    // LTI launch parameters
    return done(null, "test");
  }
);
