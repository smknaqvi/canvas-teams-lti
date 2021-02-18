import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, Index, OneToMany } from "typeorm";
import { Groups } from "./Groups";
import { UsersToProjects } from "./UsersToProjects";

//@Index("projects_pkey", ["projectid"], { unique: true })
@Entity("projects", { schema: "public" })
export class Projects {
  @Column("integer", { primary: true, name: "projectId" })
  @IsNotEmpty()
  @IsInt()
  projectId!: number;

  @Column("text", { name: "name" })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @Column("text", { name: "projectDescription" })
  @IsNotEmpty()
  @IsString()
  projectDescription!: string;

  @Column("integer", { name: "groupLimit" })
  @IsNotEmpty()
  @IsInt()
  groupLimit!: number;

  @OneToMany(() => Groups, (groups) => groups.projectId)
  groups!: Groups[];

  @OneToMany(() => UsersToProjects, (usersToProjects) => usersToProjects.user)
  public usersToProjects!: UsersToProjects[];
}
