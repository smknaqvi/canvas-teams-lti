import { AnyPtrRecord } from "dns";
import LTIStrategy from "passport-lti";

export const strategy = new LTIStrategy(
  {
    consumerKey: "10000000000002",
    consumerSecret:
      "arRexzw9zOVdjil2iXTUO5GnN137FBK6K9R4yDyIB8Nyq1o49QuiYKQfHPqUYEiS",
    // pass the req object to callback
    // passReqToCallback: true,
    // https://github.com/omsmith/ims-lti#nonce-stores
    // nonceStore: new RedisNonceStore('testconsumerkey', redisClient)
  },
  (lti: any, done: any) => {
    // LTI launch parameters
    // console.dir(lti);
    // Perform local authentication if necessary
    return done(null, "test");
  }
);

// module.exports = strategy;
