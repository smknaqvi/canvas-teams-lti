import { Column, Entity, OneToMany } from "typeorm";

import { UsersToProjects } from "./ProjectProfiles";
import { UsersToGroups } from "./UsersToGroups";

// @TODO Determine use of Index
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

  @OneToMany(() => UsersToGroups, (usersToGroups) => usersToGroups.group)
  public usersToGroups!: UsersToGroups[];

  @OneToMany(
    () => UsersToProjects,
    (usersToProjects) => usersToProjects.project
  )
  public usersToProjects!: UsersToProjects[];
}
