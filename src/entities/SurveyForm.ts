import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  JoinColumn,
  Column,
} from "typeorm";
import SurveyQuestion from "./SurveyQuestion";

@Entity()
class SurveyForm extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => SurveyQuestion, (questions) => questions.surveyForm)
  @JoinTable()
  @JoinColumn()
  questions: SurveyQuestion[];

  @Column({ type: "text", nullable: true })
  formTitle: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default SurveyForm;
