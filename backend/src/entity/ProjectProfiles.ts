import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Projects } from "./Projects";
import { Roles } from "./Roles";
import { Users } from "./Users";

@Entity("users_to_projects")
export class UsersToProjects {
  @PrimaryGeneratedColumn("rowid")
  rowId!: number;

  @PrimaryColumn("text", { name: "biography" })
  biography!: string;

  @PrimaryColumn("integer", { name: "userId" })
  userId!: number;

  @Column("integer", { name: "projectId" })
  projectId!: number;

  @OneToOne(() => Users, (user) => user.userId, { primary: true })
  @JoinColumn({ name: "userId" })
  user!: Users;
  @OneToOne(() => Projects, (project) => project.projectId, { primary: true })
  @JoinColumn({ name: "projectId" })
  project!: Projects;
}

// @OneToOne(() => Roles)
// @JoinColumn()
// roleId!: Roles;

// @ManyToOne(() => Users, (user) => user.usersToProjects)
// public user!: Users;

// @ManyToOne(() => Projects, (project) => project.usersToProjects)
// public project!: Projects;
