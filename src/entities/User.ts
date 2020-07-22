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
} from "typeorm";
import Interests from "./Interests";
import Verification from "./Verification";
import Credit from "./Credit";

// const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  firstName: string;

  @Column({ type: "text", nullable: true })
  lastName: string;

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

  @ManyToMany((type) => Interests, (interests) => interests.user)
  interests: Interests[];

  @OneToMany(() => Credit, (credit) => credit.user)
  credit: Credit[];

  @OneToOne(() => Credit, (credit) => credit.user)
  mainCredit: Credit;

  @OneToOne((type) => Verification, (verification) => verification.user)
  verification: Verification;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  /**
   * Make User's full name.
   *
   * @returns {string} User's full name
   */
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export default User;
