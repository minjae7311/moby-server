import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import Ride from "./Ride";
import User from "./User";

@Entity()
class Place extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "double precision", default: 0 })
  lat: number;

  @Column({ type: "double precision", default: 0 })
  lng: number;

  @Column({ type: "text" })
  address: string;

  @ManyToOne(() => Ride, (ride) => ride.from)
  ride_from: Ride[];

  @ManyToOne(() => Ride, (ride) => ride.to)
  ride_to: Ride[];

  @ManyToMany(() => User, (user) => user.place)
  user: User[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Place;
