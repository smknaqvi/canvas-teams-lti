import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { UsersToProjects } from "../entity/UsersToProjects";
import { Projects } from "../entity/Projects";
import { Roles } from "../entity/Roles";
import { Users } from "../entity/Users";
import { validateOrReject } from "class-validator";

// @TODO request parsing and validation
// @TODO functions can be broken up further, currently exist to demonstrate functionality

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const registerUser = async (request: Request, response: Response) => {
  const repository = getRepository(Users);
  const newUser = repository.create(request.body as Users);
  try {
    await validateOrReject(newUser);
  } catch (errors) {
    response.status(400).send(`Invalid body. Errors: ${errors}`);
    return;
  }

  try {
    const user = await repository.findOne(newUser.userId);

    if (user) {
      const projects = await getRepository(UsersToProjects).find({
        userId: newUser.userId,
      });
      response.status(200).json(projects);
      return;
    } else {
      await repository.save(newUser);

      response.status(200).json("");
      return;
    }
  } catch (e) {
    response.status(400).send("error");
    return;
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createProject = async (request: Request, response: Response) => {
  const repository = getRepository(Projects);
  const newProject = repository.create(request.body as Projects);
  try {
    await validateOrReject(newProject);
  } catch (errors) {
    response.status(400).send(`Invalid body. Errors: ${errors}`);
    return;
  }
  try {
    const projectId = await repository.findOne(request.body.projectId);
    if (projectId) {
      response.status(400).send(`${request.body.projectId} already exists!`);
    } else {
      await repository.save(newProject);
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
  const newUserProject = await bridgeRepository.create(
    request.body as UsersToProjects
  );
  if (participant != undefined) {
    newUserProject.roleId = participant;
  }
  try {
    await validateOrReject(newUserProject);
  } catch (errors) {
    response.status(400).send(`Invalid body. Errors: ${errors}`);
    return;
  }
  try {
    await bridgeRepository.save(newUserProject);

    response.status(200).send("success");
  } catch (e) {
    response.status(400).send(`error`);
  }
};
