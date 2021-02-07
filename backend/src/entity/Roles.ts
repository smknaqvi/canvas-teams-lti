import { Column, Entity, Index, OneToMany } from "typeorm";

@Index("roles_pkey", ["roleid"], { unique: true })
@Index("roles_rolename_key", ["rolename"], { unique: true })
@Entity("roles", { schema: "public" })
export class Roles {
  @Column("integer", { primary: true, name: "roleid" })
  roleid!: number;

  @Column("text", { name: "rolename", unique: true })
  rolename!: string;
}
