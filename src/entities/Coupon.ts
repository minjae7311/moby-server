import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from "typeorm";
import User from "./User";

@Entity()
class Coupon extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "text", nullable: false })
	code: string;

	@Column({ type: "text", nullable: true })
	expiry: string;

	@Column({ type: "boolean", default: false })
	expired: boolean;

	@ManyToMany(() => User, { onDelete: "SET NULL" })
	users: User[];

	@CreateDateColumn()
	createdAt: string;

	@CreateDateColumn()
	updatedAt: string;
}

export default Coupon;
