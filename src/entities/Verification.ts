import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToOne, JoinColumn, DeleteDateColumn } from "typeorm";
import { VerificationTarget } from "src/types/types";
import User from "./User";

const PHONE = "PHONE";
const EMAIL = "EMAIL";

const PHONE_VERFICATION_KEY_LENGTH = 5;

@Entity()
class Verification extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "text", enum: [PHONE, EMAIL] })
	target: VerificationTarget;

	@Column({ type: "text" })
	payload: string;

	@Column({ type: "text" })
	key: string;

	@Column({ type: "boolean", default: false })
	verified: boolean;

	@Column({ type: "boolean", default: false })
	expired: boolean;

	@OneToOne((type) => User, (user) => user.verification, { onDelete: "SET NULL" })
	@JoinColumn()
	user: User;

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: string;

	@DeleteDateColumn()
	deletedAt: string;

	@BeforeInsert()
	createKey(): void {
		if (this.target === PHONE) {
			// short key
			this.key = Math.floor(Math.random() * 100000).toString();

			while (this.key.length != PHONE_VERFICATION_KEY_LENGTH) {
				this.key = Math.floor(Math.random() * 100000).toString();
			}
		} else if (this.target === EMAIL) {
			// long key
			this.key = Math.random().toString(36).substr(2);
		}
	}
}

export default Verification;
