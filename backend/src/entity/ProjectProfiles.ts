import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Projects } from "./Projects";
import { Roles } from "./Roles";
import { Users } from "./Users";

@Entity()
export class BridgeProjectProfiles {
  @PrimaryGeneratedColumn("rowid")
  id!: string;

  @Column("text", { name: "biography" })
  biography!: string;

  @OneToOne(() => Roles)
  @JoinColumn()
  role!: Roles;

  @ManyToOne(() => Users, (user) => user.bridgeProjectProfiles)
  public user!: Users;

  @ManyToOne(() => Projects, (project) => project.bridgeProjectProfiles)
  public project!: Projects;
}
