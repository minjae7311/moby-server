/** @format */

import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToOne, CreateDateColumn, DeleteDateColumn } from "typeorm";
import User from "./User";

@Entity()
class Enquiry extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne((type) => User, { onDelete: "CASCADE" })
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

	@DeleteDateColumn()
	deletedAt: string;
}

export default Enquiry;
