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

  @ManyToOne(() => Ride, (ride) => ride.payment, { onDelete: "SET NULL" })
  ride: Ride;

  /**
   * @todo fk error on delete credit
   */
  @ManyToOne(() => Credit, { onDelete: "SET NULL" })
  @JoinColumn()
  credit: Credit;

  @Column({ type: "double precision", default: 0 })
  price: number;

  @Column({
    type: "text",
    enum: ["CREATED", "PAYED", "CANCELLED"],
    default: "CREATED",
  })
  status: string;

  @Column({ type: "text", nullable: true })
  reason: string;

  @Column({ type: "text", nullable: true })
  date: string;

  @Column({ type: "text", nullable: true })
  imp_uid: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Payment;
