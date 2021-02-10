import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Projects } from "./Projects";
import { Roles } from "./Roles";
import { Users } from "./Users";

@Entity("users_to_projects")
export class UsersToProjects {
  @PrimaryGeneratedColumn("rowid")
  rowId!: string;

  @Column("text", { name: "biography" })
  biography!: string;

  @Column("integer", { name: "userId" })
  public userId!: number;

  @Column("integer", { name: "projectId" })
  public projectId!: number;

  // @OneToOne(() => Roles)
  // @JoinColumn()
  // roleId!: Roles;

  @ManyToOne(() => Users, (user) => user.usersToProjects)
  public user!: Users;

  @ManyToOne(() => Projects, (project) => project.usersToProjects)
  public project!: Projects;
}
