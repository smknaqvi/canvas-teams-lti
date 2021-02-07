import { Request, Response } from "express";
import { Connection, getConnection, getRepository } from "typeorm";
import { Users } from "../entity/Users";

class UserController {
  protected connection: Connection;
  constructor() {
    this.connection = getConnection();
  }
  // how to declare function below?
  static registerUser = async (req: Request, res: Response) => {
    const repository = getRepository(Users);
    try {
      const user = await repository.findOne(req.body.user_id);

      if (user) {
        res.status(200).send("User exists");
      } else {
        console.log("Reached the all statement");
        await repository.save(
          repository.create({
            email: req.body.email,
            firstname: req.body.given_name,
            lastname: req.body.family_name,
            emailverified: req.body.email_verified,
            profileimage: req.body.picture,
            userid: req.body.user_id,
          })
        );
        res.status(200).send("User created");
      }
    } catch (e) {
      res.status(400).send("error");
    }
  };
}

export default UserController;
