import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from "typeorm";

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

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default SurveyQuestion;
