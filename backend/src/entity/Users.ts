import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Groups } from "./Groups";
import { UsersToProjects } from "./ProjectProfiles";
// import { Bridgegroupusers } from "./Bridgegroupusers";
// import { Bridgeprojectprofiles } from "./Bridgeprojectprofiles";
// import { Bridgeprojectusers } from "./Bridgeprojectusers";

// @Index("users_email_key", ["email"], { unique: true })
//@Index("users_pkey", ["userid"], { unique: true })
@Entity("users")
export class Users {
  @Column("integer", { primary: true, name: "userId" })
  userId!: number;

  @Column("text", { name: "firstName" })
  firstName!: string;

  @Column("text", { name: "lastName" })
  lastName!: string;

  @Column("text", { name: "profileImage" })
  profileImage!: string | null;

  @Column("text", { name: "email" })
  email!: string;

  //@Column("boolean", { name: "emailVerified" })
  //emailVerified!: boolean | null;

  @ManyToMany(() => Groups)
  @JoinTable()
  groupId!: Groups[];

  // @OneToMany(
  //   () => UsersToProjects,
  //   (usersToProjects) => usersToProjects.project
  // )
  // public usersToProjects!: UsersToProjects[];
}
