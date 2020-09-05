/** @format */

import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import User from "./User";

@Entity()
class Enquiry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, { nullable: false })
  user: User;

  @Column({ type: "text", nullable: false })
  questionTitle: string;

  @Column({ type: "text", nullable: false })
  questionContent: string;

  @Column({ type: "text", nullable: true })
  answerTitle: string;

  @Column({ type: "text", nullable: true })
  answerContent: string;

  @CreateDateColumn()
  createdAt: string;

  @CreateDateColumn()
  updatedAt: string;
}

export default Enquiry;
