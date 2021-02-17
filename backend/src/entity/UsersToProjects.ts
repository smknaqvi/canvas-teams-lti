import { IsInt, IsNotEmpty, IsString } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Projects } from "./Projects";
import { Roles } from "./Roles";
import { Users } from "./Users";

@Entity("users_to_projects")
export class UsersToProjects {
  @PrimaryColumn()
  @IsNotEmpty()
  @IsInt()
  userId!: number;

  @PrimaryColumn()
  @IsNotEmpty()
  @IsInt()
  projectId!: number;

  @Column("text", { name: "biography" })
  @IsNotEmpty()
  @IsString()
  biography!: string;

  @OneToOne(() => Roles)
  @JoinColumn()
  @IsNotEmpty()
  public roleId!: Roles;

  @ManyToOne(() => Users, (user) => user.usersToProjects)
  @JoinColumn({ name: "userId" })
  public user!: Users;

  @ManyToOne(() => Projects, (project) => project.usersToProjects)
  @JoinColumn({ name: "projectId" })
  public project!: Projects;
}
