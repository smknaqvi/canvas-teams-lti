import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { UsersToProjects } from "../entity/UsersToProjects";
import { Projects } from "../entity/Projects";
import { Roles } from "../entity/Roles";
import { Users } from "../entity/Users";

// @TODO request parsing and validation
// @TODO functions can be broken up further, currently exist to demonstrate functionality

// linter does not like missing return type of these functions
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const registerUser = async (req: Request, res: Response) => {
  const repository = getRepository(Users);
  try {
    const user = await repository.findOne(req.body.user_id);

    if (user) {
      res.status(200).send("User exists");
      return;
    } else {
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createProject = async (request: Request, response: Response) => {
  const repository = getRepository(Projects);
  try {
    const projectId = await repository.findOne(request.body.projectId);
    if (projectId) {
      response.status(400).send(`${request.body.projectId} already exists!`);
    } else {
      await repository.save(
        repository.create({
          projectId: request.body.projectId,
          name: request.body.name,
          projectDescription: request.body.projectDescription,
          groupLimit: request.body.groupLimit,
        })
      );
      response.status(200).send("Project created");
    }
  } catch (e) {
    response.status(400).send("Database error");
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const addUserToProject = async (
  request: Request,
  response: Response
) => {
  const userId = request.body.userId;
  const userRepository = getRepository(Users);
  const user = await userRepository.findOne(userId);
  if (!user) {
    response.status(400).send(`${userId} does not exist!`);
  }
  const projectRepository = getRepository(Projects);
  const projectId = request.body.projectId;
  const project = await projectRepository.findOne(projectId);
  if (!project) {
    response.status(400).send(`${projectId} does not exist!`);
  }
  const bridgeRepository = getRepository(UsersToProjects);
  const roleRepository = getRepository(Roles);
  const participant = await roleRepository.findOne(1);

  try {
    await bridgeRepository.save(
      bridgeRepository.create({
        biography: request.body.biography,
        project: project,
        user: user,
        roleId: participant,
      })
    );

    response.status(200).send("success");
  } catch (e) {
    response.status(400).send(`error`);
  }
};
