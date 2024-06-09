import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", unique: true, nullable: false })
  username!: string;

  @Column({ type: "varchar", nullable: false })
  passwordHash!: string;
}
