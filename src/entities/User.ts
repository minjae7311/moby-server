// import { IsEmail } from "class-validator";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  // BeforeUpdate,
  ManyToMany,
  OneToOne,
} from "typeorm";
import Interests from "./Interests";
import Verification from "./Verification";

// const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  @Column({ type: "text", default: "DEFAULT_PHOTO_URL" })
  profilePhotoUrl: string;

  /**
   * @todo default photoUrl
   */
  @Column({ type: "text" })
  phoneNumber: string;

  @Column({ type: "boolean", default: false })
  verifiedPhoneNumber: boolean;

  @Column({ type: "text" })
  gender: string;

  @Column({ type: "text" })
  birthDate: string;

  @Column({ type: "text" })
  job: string;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "text" })
  deviceId: string;

  @ManyToMany((type) => Interests, (interests) => interests.user)
  interests: Interests[];

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

  // @BeforeInsert()
  // // @BeforeUpdate()
  // async savePassword(): Promise<void> {
  //   if (this.password) {
  //     const hashedPassword = await this.hashPassword(this.password);
  //     this.password = hashedPassword;
  //   }
  // }

  // public comparePassword(password: string): Promise<boolean> {
  //   return bcrypt.compare(password, this.password, null);
  // }

  // private hashPassword(password: string): Promise<string> {
  //   return bcrypt.hash(password, BCRYPT_ROUNDS);
  // }
}

export default User;
