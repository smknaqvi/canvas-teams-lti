import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
// import { Bridgegroupusers } from "./Bridgegroupusers";
import { Projects } from "./Projects";

//@Index("groups_pkey", ["groupid"], { unique: true })
@Entity("groups", { schema: "public" })
export class Groups {
  @Column("integer", { primary: true, name: "groupId" })
  groupid!: number;

  @Column("text", { name: "name" })
  name!: string;

  // @OneToMany(
  //   () => Bridgegroupusers,
  //   (bridgegroupusers) => bridgegroupusers.group
  // )
  // bridgegroupusers!: Bridgegroupusers[];

  @ManyToOne(() => Projects, (projects) => projects.groups)
  @JoinColumn([{ name: "projectId", referencedColumnName: "projectId" }])
  projectId!: Projects;
}
