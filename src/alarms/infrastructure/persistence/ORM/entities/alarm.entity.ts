import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AlarmItemEntity } from "./alarm-item.entity";

@Entity("alarms")
export class AlarmEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  severity: string;

  @Column({ default: false })
  isAcknowledged: boolean;

  @Column()
  triggeredAt: Date;

  @OneToMany(() => AlarmItemEntity, (item) => item.alarm, { cascade: true })
  items: AlarmItemEntity[];
}
