import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Groups } from "./Groups";
import { BridgeProjectProfiles } from "./ProjectProfiles";
// import { Bridgegroupusers } from "./Bridgegroupusers";
// import { Bridgeprojectprofiles } from "./Bridgeprojectprofiles";
// import { Bridgeprojectusers } from "./Bridgeprojectusers";

// @Index("users_email_key", ["email"], { unique: true })
@Index("users_pkey", ["userid"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @Column("integer", { primary: true, name: "userId" })
  userid!: number;

  @Column("text", { name: "firstname" })
  firstname!: string;

  @Column("text", { name: "lastname" })
  lastname!: string;

  @Column("text", { name: "profileimage" })
  profileimage!: string | null;

  @Column("text", { name: "email" })
  email!: string;

  @Column("boolean", { name: "emailverified" })
  emailverified!: boolean | null;

  @ManyToMany(() => Groups)
  @JoinTable()
  groupId!: Groups[];

  @OneToMany(
    () => BridgeProjectProfiles,
    (bridgeProjectProfiles) => bridgeProjectProfiles.project
  )
  public bridgeProjectProfiles!: BridgeProjectProfiles[];
}
