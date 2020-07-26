import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from "typeorm";
import Chat from "./Chat";
import User from "./User";
import Driver from "./Driver";

@Entity()
class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  text: string;

  @ManyToOne((type) => Chat, (chat) => chat.messages)
  @JoinColumn()
  chat: Chat;

  @ManyToOne((type) => User)
  passenger: User;

  @ManyToOne((type) => Driver)
  driver: Driver;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Message;
