import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from "typeorm";
import Ride from "./Ride";

@Entity()
class Discount extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ride, (ride) => ride.discount)
  ride: Ride;

  @Column({ type: "double precision", default: 0 })
  price: number;

  @Column({ type: "text", nullable: false })
  reason: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Discount;
