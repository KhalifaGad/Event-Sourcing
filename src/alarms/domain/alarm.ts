import { VersionedAggregateRoot } from "src/shared/domain/aggregate-root";
import { AlarmItem } from "./alarm-item";
import { AlarmSeverity } from "./value-objects";

export class Alarm extends VersionedAggregateRoot {
  public name: string;
  public severity: AlarmSeverity;
  public isAcknowledged = false;
  public triggeredAt: Date;
  public items = new Array<AlarmItem>();

  constructor(public id: string) {
    super();
  }

  acknowledge() {
    this.isAcknowledged = true;
  }

  addAlarmItem(item: AlarmItem) {
    this.items.push(item);
  }
}
