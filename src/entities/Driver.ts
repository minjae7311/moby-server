import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany, ManyToOne, BeforeUpdate, BeforeInsert, Unique, DeleteDateColumn } from "typeorm";
import Ride from "./Ride";
import Vehicle from "./Vehicle";
import bcrypt from "bcrypt";

const BCRYPT_ROUNDS = 10;

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

	@Column({ type: "boolean", nullable: false, default: false })
	workingOn: boolean;

	@OneToMany(() => Ride, (ride) => ride.driver, { onDelete: "SET NULL", onUpdate: "CASCADE" })
	rides: Ride[];

	@ManyToOne(() => Vehicle, { onDelete: "SET NULL", onUpdate: "CASCADE" })
	vehicle: Vehicle;

	@Column({ type: "text", nullable: false })
	loginId: string;

	@Column({ type: "text", nullable: false })
	loginPw: string;

	@Column({ type: "boolean", nullable: false, default: false })
	privateTaxi: boolean;

	@Column({ type: "text", nullable: true })
	company: string;

	@Column({ type: "text", nullable: false })
	driveLicenseNumber: string;

	@Column({ type: "text", nullable: false })
	taxiLicenseNumber: string;

	@Column({ type: "text", nullable: false })
	fullName: string;

	/**
	 * @todo default photoUrl
	 */
	@Column({ type: "text", nullable: false, default: "DEFAULT_PHOTO_URL" })
	profilePhotoUrl: string;

	@Unique(["phoneNumber"])
	@Column({ type: "text", nullable: false })
	phoneNumber: string;

	@Column({ type: "boolean", default: false })
	verifiedPhoneNumber: boolean;

	@Column({ type: "text", nullable: true })
	gender: string;

	@Column({ type: "boolean", default: false })
	accepted: boolean;

	@Column({ type: "text", nullable: true })
	birthDate: string;

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: string;

	@DeleteDateColumn()
	deletedAt: string;

	@BeforeInsert()
	@BeforeUpdate()
	async savePassword(): Promise<void> {
		if (this.loginPw) {
			const hashedPassword = await this.hashPassword(this.loginPw);
			this.loginPw = hashedPassword;
		}
	}

	public comparePassword(password: string): Promise<boolean> {
		return bcrypt.compare(password, this.loginPw);
	}

	private hashPassword(password: string): Promise<string> {
		return bcrypt.hash(password, BCRYPT_ROUNDS);
	}
}

export default Driver;
