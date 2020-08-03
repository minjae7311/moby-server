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
import Ride from "./Ride";
import Vehicle from "./Vehicle";

@Entity()
class Driver extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "double precision", default: 0 })
  lat: number;

  @Column({ type: "double precision", default: 0 })
  lng: number;

  @Column({ type: "boolean", nullable: false, default: false })
  isDriving: boolean;

  @OneToMany(() => Ride, (ride) => ride.driver)
  rides: Ride[];

  @ManyToOne(() => Vehicle, { nullable: false })
  vehicle: Vehicle;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Driver;
