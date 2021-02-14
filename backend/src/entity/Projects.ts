import { Column, Entity, Index, OneToMany } from "typeorm";
import { Groups } from "./Groups";
import { UsersToProjects } from "./UsersToProjects";

//@Index("projects_pkey", ["projectid"], { unique: true })
@Entity("projects", { schema: "public" })
export class Projects {
  @Column("integer", { primary: true, name: "projectId" })
  projectId!: number;

  @Column("text", { name: "name" })
  name!: string;

  @Column("text", { name: "projectDescription" })
  projectDescription!: string;

  @Column("integer", { name: "groupLimit" })
  groupLimit!: number;

  @OneToMany(() => Groups, (groups) => groups.projectId)
  groups!: Groups[];

  @OneToMany(() => UsersToProjects, (usersToProjects) => usersToProjects.user)
  public usersToProjects!: UsersToProjects[];
}
