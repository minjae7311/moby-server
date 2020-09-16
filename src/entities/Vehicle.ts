import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from "typeorm";
import SurveyForm from "./SurveyForm";

@Entity()
class Vehicle extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "double precision", default: 0 })
	discount: number;

	@ManyToOne(() => SurveyForm, { onDelete: "SET NULL", onUpdate: "CASCADE" })
	@JoinColumn()
	surveyForm: SurveyForm;

	@Column({ type: "text", nullable: true })
	company: string;

	@Column({ type: "text", nullable: false })
	carType: string;

	@Column({ type: "text", nullable: false })
	carNumber: string;

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: string;

	@DeleteDateColumn()
	deletedAt: string;
}

export default Vehicle;
