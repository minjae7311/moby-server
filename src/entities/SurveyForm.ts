import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from "typeorm";

@Entity()
class SurveyForm extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "jsonb", nullable: false })
  contentsJson: JSON;

  @Column({ type: "text", nullable: true })
  formTitle: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default SurveyForm;
