import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToMany,
} from "typeorm";
import SurveyForm from "./SurveyForm";

@Entity()
class SurveyQuestion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "boolean", nullable: false, default: false })
  isSubjective: boolean;

  @Column({ type: "text", nullable: false })
  question: string;

  @Column({ type: "text", nullable: true })
  answers: string[];

  @ManyToMany(() => SurveyForm, (surveyForm) => surveyForm.questions)
  surveyForm: SurveyForm[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default SurveyQuestion;
