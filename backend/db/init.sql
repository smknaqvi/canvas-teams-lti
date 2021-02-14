DROP TABLE IF EXISTS bridgeProjectUsers;


DROP TABLE IF EXISTS bridgeGroupUsers;


DROP TABLE IF EXISTS roles;


DROP TABLE IF EXISTS bridgeProjectProfiles;


DROP TABLE IF EXISTS groups;


DROP TABLE IF EXISTS projects;


DROP TABLE IF EXISTS users;


CREATE TABLE projects(
  projectId int PRIMARY KEY,
  name text NOT NULL,
  projectDescription text NOT NULL
);


CREATE TABLE users(
  userId int PRIMARY KEY,
  firstName text NOT NULL,
  lastName text NOT NULL,
  profileImage text,
  email text NOT NULL UNIQUE,
  emailVerified boolean
);


CREATE TABLE groups(
  groupId int PRIMARY KEY,
  name text NOT NULL,
  projectId int REFERENCES projects (projectId)
);


CREATE TABLE bridgeProjectProfiles (
  userId int REFERENCES users (userId),
  projectId int REFERENCES projects (projectId),
  biography text NOT NULL
);


CREATE TABLE roles(
  roleId int PRIMARY KEY,
  roleName text NOT NULL UNIQUE
);


CREATE TABLE bridgeProjectUsers(
  projectId int REFERENCES projects (projectId),
  userId int REFERENCES users (userId),
  roleId int REFERENCES roles (roleId)
);


CREATE TABLE bridgeGroupUsers(
  groupId int REFERENCES groups (groupId),
  userid int REFERENCES users (userId)
);