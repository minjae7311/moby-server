import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
//   BeforeInsert,
//   BeforeUpdate,
} from "typeorm";
import Ride from "./Ride";
import Credit from "./Credit";

@Entity()
class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ride, (ride) => ride.payment)
  ride: Ride;

  @ManyToOne(() => Credit, (credit) => credit.payment)
  @JoinColumn()
  credit: Credit;

  @Column({ type: "double precision", default: 0 })
  price: number;

  @Column({ type: "boolean", default: false })
  isCancelled: boolean;

  @Column({ type: "text", nullable: true })
  reason: string;

  @Column({ type: "text", nullable: true })
  date: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  //   @BeforeInsert()
  //   @BeforeUpdate()
  /**
   * @todo update date
   */
}

export default Payment;
