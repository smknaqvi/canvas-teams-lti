
-- DROP TABLE IF EXISTS projects;


-- DROP TABLE IF EXISTS bridgeProjectUsers;


-- DROP TABLE IF EXISTS bridgeGroupUsers;


-- DROP TABLE IF EXISTS roles;


-- DROP TABLE IF EXISTS profile;


-- DROP TABLE IF EXISTS users;


-- DROP TABLE IF EXISTS groups;


CREATE TABLE projects(projectId int PRIMARY KEY, name text NOT NULL);


CREATE TABLE users(
  userId int PRIMARY KEY,
  firstName text NOT NULL,
  lastName text NOT NULL,
  email text NOT NULL UNIQUE,
  emailVerified boolean
);


CREATE TABLE groups(
  groupId int PRIMARY KEY,
  name text NOT NULL,
  projectId int REFERENCES projects (projectId)
);


CREATE TABLE projectProfiles (
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

/*
CREATE FUNCTION enforceGroupLimit(userNumber int, projectNumber int) RETURNS boolean AS $success$ DECLARE numberOfGroups int;


BEGIN
SELECT
  count(userId) INTO numberOfGroups
WHERE
  groupId IN (
    SELECT
      groupId
    FROM
      groups
    WHERE
      groups.projectId = enforcerGroupLimit.projectNumber
  )
FROM
  joinGroupUsers
WHERE
  joinGroupUsers.userId = enforceGroupLimit.userNumber;


RETURN numberOfGroups = 1;


END;


$success$ LANGUAGE plpgsql;


CREATE Trigger groupEnforcement before
INSERT
  ON bridgeGroupUsers;
  */