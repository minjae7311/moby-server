import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import Payment from "./Payment";
import Discount from "./Discount";
import Place from "./Place";
import User from "./User";
import Driver from "./Driver";

@Entity()
class Ride extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Place)
  from: Place;

  @ManyToOne(() => Place)
  to: Place;

  @OneToMany(() => Payment, (payment) => payment.ride)
  payment: Payment[];

  @Column({ type: "double precision", default: 0 })
  finalFee: number;

  @OneToMany(() => Discount, (discount) => discount.ride)
  discount: Discount[];

  @ManyToOne(() => User, (user) => user.rides)
  passenger: User;

  @ManyToOne(() => Driver, (driver) => driver.rides)
  driver: Driver;

  @Column({ type: "boolean", nullable: false, default: false })
  accepted: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Ride;
