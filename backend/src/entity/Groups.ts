import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Projects } from "./Projects";
import { UsersToGroups } from "./UsersToGroups";

//@Index("groups_pkey", ["groupid"], { unique: true })
@Entity("groups", { schema: "public" })
export class Groups {
  @Column("integer", { primary: true, name: "groupId" })
  groupid!: number;

  @Column("text", { name: "name" })
  name!: string;

  @ManyToOne(() => Projects, (projects) => projects.groups)
  @JoinColumn([{ name: "projectId", referencedColumnName: "projectId" }])
  projectId!: Projects;

  @OneToMany(() => UsersToGroups, (usersToGroups) => usersToGroups.user)
  public usersToGroups!: UsersToGroups[];
}
