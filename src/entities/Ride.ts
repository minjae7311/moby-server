import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from "typeorm";
import Payment from "./Payment";
import Discount from "./Discount";

@Entity()
class Ride extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @OneToMany(()=>Place, place=>place.ride)
  //   from:Place;

  //   @OneToMany(()=>Place, place=>place.ride)
  // to:Place;

  @OneToMany(() => Payment, (payment) => payment.ride)
  payment: Payment[];

  @Column({ type: "double precision", default: 0 })
  finalFee: number;

  @OneToMany(() => Discount, (discount) => discount.ride)
  discount: Discount[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Ride;
