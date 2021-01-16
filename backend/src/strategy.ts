import LTIStrategy from "passport-lti";
import { DEV_CLIENT_ID, DEV_LTI_KEY } from "./config/constants";

export const strategy = new LTIStrategy(
  {
    consumerKey: DEV_CLIENT_ID,
    consumerSecret: DEV_LTI_KEY,
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
