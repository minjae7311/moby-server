import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import User from "./User";
import Payment from "./Payment";

@Entity()
class Credit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.credit)
  @JoinColumn()
  user: User;

  @Column({ type: "text" })
  nickname: string;

  @Column({ type: "text" })
  card_name: string;

  @Column({ type: "text", nullable: false })
  card_number: string;

  @Column({ type: "text", nullable: false })
  expiry: string;

  // @Column({ type: "text", nullable: false })
  // cvv: string;

  // @Column({ type: "text", nullable: false })
  // sid: string;

  @OneToMany(() => Payment, (payment) => payment.credit)
  payment: Payment[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Credit;
