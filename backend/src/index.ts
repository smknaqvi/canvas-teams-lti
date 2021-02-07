import "./config/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { jwtCheck } from "./middleware/auth";
import { HOST_ADDRESS, PORT } from "./config/constants";
import apiRouter from "./routes/apiRoutes";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Users } from "./entity/Users";

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(jwtCheck);

// endpoints
app.use("/api", apiRouter);
createConnection().then(async (connection) => {
  app.listen(PORT, () => {
    console.log(`Listening to requests on ${HOST_ADDRESS}:${PORT}`);
  });
  // Test connection
  // await connection.manager.save(
  //   connection.manager.create(Users, {
  //     userid: 913,
  //     firstname: "hello",
  //     lastname: "random",
  //     profileimage: "randoam",
  //     email: "teaaastzxzdssczx",
  //     emailverified: true,
  //   })
  // );
});
