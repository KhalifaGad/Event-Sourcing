import { AlarmItemEntity } from "./alarm-item.entity";

export class AlarmEntity {
  public id: string;
  public name: string;
  public severity: string;
  public isAcknowledged: boolean;
  public triggeredAt: Date;
  public items: AlarmItemEntity[];
}
