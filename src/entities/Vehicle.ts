import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import SurveyForm from "./SurveyForm";

@Entity()
class Vehicle extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "double precision", default: 0 })
	discount: number;

	@ManyToOne(() => SurveyForm, { onDelete: "SET NULL" })
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
}

export default Vehicle;
