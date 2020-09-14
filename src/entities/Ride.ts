import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany, ManyToOne, JoinColumn, DeleteDateColumn } from "typeorm";
import Payment from "./Payment";
import Place from "./Place";
import User from "./User";
import Driver from "./Driver";
import { rideStatus } from "../types/types";
import Vehicle from "./Vehicle";
import Credit from "./Credit";

@Entity()
class Ride extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Place)
	from: Place;

	@ManyToOne(() => Place)
	to: Place;

	@OneToMany(() => Payment, (payment) => payment.ride, { onDelete: "SET NULL" })
	payment: Payment[];

	@ManyToOne(() => Credit, { onDelete: "SET NULL" })
	credit: Credit;

	@Column({ type: "double precision", nullable: true })
	expectingFee: number;

	@Column({ type: "double precision", nullable: true })
	finalFee: number;

	@Column({ type: "double precision", nullable: true })
	distanceBetween: number;

	// @Column({ type: "double precision", nullable: true })
	// findingDistance: number;

	@ManyToOne(() => User, (user) => user.rides, { onDelete: "SET NULL" })
	passenger: User;

	@ManyToOne(() => Driver, (driver) => driver.rides, { onDelete: "SET NULL" })
	driver: Driver;

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

	@ManyToOne(() => Vehicle, { onDelete: "SET NULL" })
	@JoinColumn()
	vehicle: Vehicle;

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: string;

	@DeleteDateColumn()
	deletedAt: string;
}

export default Ride;
