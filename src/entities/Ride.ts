import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
} from "typeorm";
import Payment from "./Payment";
import Discount from "./Discount";
import Place from "./Place";
import User from "./User";
import Driver from "./Driver";
import { rideStatus } from "../types/types";
import Chat from "./Chat";

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

  @Column({ type: "double precision", nullable: true })
  expectingFee: number;

  @Column({ type: "double precision", nullable: true })
  finalFee: number;

  @OneToMany(() => Discount, (discount) => discount.ride)
  discount: Discount[];

  @ManyToOne(() => User, (user) => user.rides)
  passenger: User;

  @ManyToOne(() => Driver, (driver) => driver.rides)
  driver: Driver;

  @OneToOne(() => Chat, (chat) => chat.ride)
  chat: Chat;

  @Column({
    type: "text",
    enum: ["ACCEPTED", "FINISHED", "CANCELED", "REQUESTING", "ONROUTE"],
    default: "REQUESTING",
  })
  status: rideStatus;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Ride;
