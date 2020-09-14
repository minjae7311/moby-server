import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from "typeorm";
import User from "./User";

@Entity()
class Credit extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, (user) => user.credit, { onDelete: "SET NULL" })
	@JoinColumn()
	user: User;

	@Column({ type: "text", nullable: true })
	nickname: string;

	@Column({ type: "text", nullable: true })
	card_name: string;

	@Column({ type: "text", nullable: false })
	card_number: string;

	@Column({ type: "text", nullable: false })
	expiry: string;

	@Column({ type: "boolean", nullable: false, default: false })
	isMain: boolean;

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: string;

	@DeleteDateColumn()
	deletedAt: string;

	get first4numbers(): string {
		return this.card_number.slice(0, 4);
	}
}

export default Credit;
