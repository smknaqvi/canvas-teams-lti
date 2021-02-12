import {
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Projects } from "./Projects";
// import { Roles } from "./Roles";
import { Users } from "./Users";

@Entity("users_to_projects")
export class UsersToProjects {
  @PrimaryGeneratedColumn("rowid")
  rowId!: number;

  @PrimaryColumn("text", { name: "biography" })
  biography!: string;

  // @TODO Add roles
  // @OneToOne(() => Roles)
  // @JoinColumn()
  // roleId!: Roles;

  @ManyToOne(() => Users, (user) => user.usersToProjects)
  public user!: Users;

  @ManyToOne(() => Projects, (project) => project.usersToProjects)
  public project!: Projects;
}
