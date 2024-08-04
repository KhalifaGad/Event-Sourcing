import { Alarm } from "src/alarms/domain/alarm";
import { AlarmItem } from "src/alarms/domain/alarm-item";
import { AlarmSeverityValue } from "src/alarms/domain/types";
import { AlarmSeverity } from "src/alarms/domain/value-objects";
import { AlarmItemEntity } from "../entities/alarm-item.entity";
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
    alarmEntity.items.forEach((item) =>
      alarm.addAlarmItem(new AlarmItem(item.id, item.name, item.type)),
    );
    return alarm;
  }

  static toPersistence(alarm: Alarm) {
    const entity = new AlarmEntity();
    entity.id = alarm.id;
    entity.name = alarm.name;
    entity.severity = alarm.severity.value;
    entity.isAcknowledged = alarm.isAcknowledged;
    entity.triggeredAt = alarm.triggeredAt;
    entity.items = alarm.items.map((item) => {
      const itemEntity = new AlarmItemEntity();
      itemEntity.id = item.id;
      itemEntity.name = item.name;
      itemEntity.type = item.type;
      return itemEntity;
    });
    return entity;
  }
}
