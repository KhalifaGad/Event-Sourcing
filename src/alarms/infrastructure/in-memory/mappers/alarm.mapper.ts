import { Alarm } from "src/alarms/domain/alarm";
import { AlarmSeverityValue } from "src/alarms/domain/types";
import { AlarmSeverity } from "src/alarms/domain/value-objects";
import { AlarmEntity } from "../entities/alarm.entity";

export class AlarmMapper {
  static toDomain(alarmEntity: AlarmEntity) {
    const severity = new AlarmSeverity(
      alarmEntity.severity as AlarmSeverityValue,
    );
    const alarm = new Alarm(alarmEntity.id);
    alarm.name = alarmEntity.name;
    alarm.severity = severity;
    alarm.isAcknowledged = alarmEntity.isAcknowledged;
    alarm.triggeredAt = alarmEntity.triggeredAt;
    alarm.items = alarmEntity.items;
    return alarm;
  }

  static toPersistence(id: string, alarm: Alarm) {
    const entity = new AlarmEntity();
    entity.id = id;
    entity.name = alarm.name;
    entity.severity = alarm.severity.value;
    entity.isAcknowledged = alarm.isAcknowledged;
    entity.triggeredAt = alarm.triggeredAt;
    entity.items = alarm.items;
    return entity;
  }
}
