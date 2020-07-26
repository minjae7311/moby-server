import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import Message from "./Message";
import User from "./User";
import Ride from "./Ride";
import Driver from "./Driver";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => Ride, (ride) => ride.chat)
  @JoinColumn()
  ride: Ride;

  @OneToMany((type) => Message, (message) => message.chat)
  messages: Message[];

  @ManyToOne((type) => User)
  @JoinColumn()
  passenger: User;

  @ManyToOne((type) => Driver)
  @JoinColumn()
  driver: Driver;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Chat;
