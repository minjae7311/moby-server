import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
class Place extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "text", nullable: true })
	name: string;

	@Column({ type: "double precision", default: 0 })
	lat: number;

	@Column({ type: "double precision", default: 0 })
	lng: number;

	@Column({ type: "text" })
	address: string;

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: string;

	@DeleteDateColumn()
	deletedAt: string;
}

export default Place;
