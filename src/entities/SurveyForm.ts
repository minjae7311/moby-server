import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from "typeorm";
import SurveyQuestion from "./SurveyQuestion";

@Entity()
class SurveyForm extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => SurveyQuestion)
  questions: SurveyQuestion[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default SurveyForm;
