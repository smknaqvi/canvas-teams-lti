import { Column, Entity, Index, OneToMany } from "typeorm";
// import { Bridgeprojectprofiles } from "./Bridgeprojectprofiles";
// import { Bridgeprojectusers } from "./Bridgeprojectusers";
import { Groups } from "./Groups";
import { BridgeProjectProfiles } from "./ProjectProfiles";

@Index("projects_pkey", ["projectid"], { unique: true })
@Entity("projects", { schema: "public" })
export class Projects {
  @Column("integer", { primary: true, name: "projectid" })
  projectid!: number;

  @Column("text", { name: "name" })
  name!: string;

  @Column("text", { name: "projectdescription" })
  projectdescription!: string;

  @OneToMany(() => Groups, (groups) => groups.project)
  groups!: Groups[];

  @OneToMany(
    () => BridgeProjectProfiles,
    (bridgeProjectProfiles) => bridgeProjectProfiles.user
  )
  public bridgeProjectProfiles!: BridgeProjectProfiles[];
}
