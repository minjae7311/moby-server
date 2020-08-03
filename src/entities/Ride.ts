import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Payment from "./Payment";
import Place from "./Place";
import User from "./User";
import Driver from "./Driver";
import { rideStatus } from "../types/types";
import Vehicle from "./Vehicle";

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

  @Column({ type: "double precision", nullable: true })
  distanceBetween: number;

  @ManyToOne(() => User, (user) => user.rides)
  passenger: User;

  @ManyToOne(() => Driver, (driver) => driver.rides)
  driver: Driver;

  /**
   * @todo hadle these things
   */
  @Column({ type: "text", nullable: true })
  requestedDate: string;

  @Column({ type: "text", nullable: true })
  acceptedDate: string;

  @Column({ type: "text", nullable: true })
  finishedDate: string;

  @Column({ type: "text", nullable: true })
  cancelledDate: string;

  @Column({ type: "boolean", nullable: false, default: false })
  surveyCompleted: boolean;

  @Column({
    type: "text",
    enum: ["ACCEPTED", "FINISHED", "CANCELED", "REQUESTING", "ONROUTE"],
    default: "REQUESTING",
  })
  status: rideStatus;

  @ManyToOne(() => Vehicle, { nullable: true })
  @JoinColumn()
  vehicle: Vehicle;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Ride;
