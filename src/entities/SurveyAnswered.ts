import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, JoinColumn, OneToOne, DeleteDateColumn } from "typeorm";
import User from "./User";
import Ride from "./Ride";
import SurveyForm from "./SurveyForm";

@Entity()
class SurveyAnswered extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User)
	@JoinColumn()
	user: User;

	@OneToOne(() => Ride)
	@JoinColumn()
	ride: Ride;

	@ManyToOne(() => SurveyForm, { onDelete: "SET NULL", onUpdate: "CASCADE" })
	@JoinColumn()
	surveyForm: SurveyForm;

	@Column({ type: "jsonb" })
	answeredJson: JSON;

	@Column({ type: "boolean", default: false })
	paybacked: boolean;

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: string;

	@DeleteDateColumn()
	deletedAt: string;
}

export default SurveyAnswered;
