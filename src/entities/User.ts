// import { IsEmail } from "class-validator";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToOne,
  Unique,
  OneToMany,
  // JoinTable,
} from "typeorm";
import Interests from "./Interests";
import Verification from "./Verification";
import Credit from "./Credit";
import Place from "./Place";
import Ride from "./Ride";

// const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  fullName: string;

  /**
   * @todo default photoUrl
   */
  @Column({ type: "text", default: "DEFAULT_PHOTO_URL" })
  profilePhotoUrl: string;

  @Unique(["phoneNumber"])
  @Column({ type: "text" })
  phoneNumber: string;

  @Column({ type: "boolean", default: false })
  verifiedPhoneNumber: boolean;

  @Column({ type: "text", nullable: true })
  gender: string;

  @Column({ type: "text", nullable: true })
  birthDate: string;

  @Column({ type: "text", nullable: true })
  job: string;

  @Column({ type: "text", nullable: false, default: "" })
  deviceId: string;

  @Column({ type: "boolean", default: false })
  isRiding: boolean;

  @ManyToMany((type) => Interests, (interests) => interests.user)
  interests: Interests[];

  @OneToMany(() => Credit, (credit) => credit.user)
  credit: Credit[];

  @OneToOne((type) => Verification, (verification) => verification.user)
  verification: Verification;

  @ManyToMany(() => Place)
  favPlace: Place[];

  @OneToMany(() => Ride, (ride) => ride.passenger)
  rides: Ride[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default User;
