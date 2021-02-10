import { Request, Response } from "express";
import { Connection, getConnection, getRepository } from "typeorm";
import { Users } from "../entity/Users";

// class UserController {
//   protected connection: Connection;
//   constructor() {
//     this.connection = getConnection();
//   }
// how to declare function below?
const registerUser = async (req: Request, res: Response) => {
  const repository = getRepository(Users);
  try {
    const user = await repository.findOne(req.body.user_id);

    if (user) {
      res.status(200).send("User exists");
      return;
    } else {
      console.log("Reached the all statement");
      await repository.save(
        repository.create({
          email: req.body.email,
          firstName: req.body.given_name,
          lastName: req.body.family_name,
          //   emailverified: req.body.email_verified,
          profileImage: req.body.picture,
          userId: req.body.user_id,
        })
      );
      res.status(200).send("User created");
      return;
    }
  } catch (e) {
    res.status(400).send("error");
    return;
  }
};
// }

// export default UserController;
export default registerUser;
