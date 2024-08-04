import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { AlarmCreatedEvent } from "../events/alarm-created.event";
import { AlarmSeverityValue } from "../types";
import { Alarm } from "../alarm";
import { AlarmSeverity } from "../value-objects";
import { AlarmItem } from "../alarm-item";

@Injectable()
export class AlarmFactory {
  create(
    name: string,
    severity: AlarmSeverityValue,
    triggeredAt: Date,
    items: Array<Omit<AlarmItem, "id">>,
  ) {
    const alarmSeverity = new AlarmSeverity(severity);
    const alarmId = randomUUID();
    const alarm = new Alarm(alarmId);
    alarm.name = name;
    alarm.severity = alarmSeverity;
    alarm.triggeredAt = triggeredAt;
    items.forEach((item) =>
      alarm.addAlarmItem(new AlarmItem(null, item.name, item.type)),
    );

    alarm.apply(new AlarmCreatedEvent(alarm), { skipHandler: true });

    return alarm;
  }
}
