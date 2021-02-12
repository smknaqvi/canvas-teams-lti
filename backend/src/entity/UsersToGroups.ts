import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Groups } from "./Groups";
import { Projects } from "./Projects";
import { Roles } from "./Roles";
import { Users } from "./Users";

@Entity("users_to_groups")
export class UsersToGroups {
  @PrimaryGeneratedColumn("rowid")
  rowId!: number;

  @ManyToOne(() => Users, (user) => user.usersToGroups)
  public user!: Users;

  @ManyToOne(() => Groups, (group) => group.usersToGroups)
  public group!: Groups;
}
