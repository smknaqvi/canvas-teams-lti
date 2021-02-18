import { Column, Entity, OneToMany } from "typeorm";

import { UsersToProjects } from "./UsersToProjects";
import { UsersToGroups } from "./UsersToGroups";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

// @TODO Determine use of Index
// @Index("users_email_key", ["email"], { unique: true })
//@Index("users_pkey", ["userid"], { unique: true })
@Entity("users")
export class Users {
  @Column("integer", { primary: true, name: "userId" })
  @IsNotEmpty()
  @IsInt()
  userId!: number;

  @Column("text", { name: "firstName" })
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @Column("text", { name: "lastName" })
  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @Column("text", { name: "profileImage" })
  @IsNotEmpty()
  @IsString()
  profileImage!: string | null;

  @Column("text", { name: "email" })
  @IsNotEmpty()
  @IsString()
  email!: string;

  // @TODO decide what to do with this
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
