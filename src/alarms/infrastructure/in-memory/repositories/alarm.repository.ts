import { Injectable } from "@nestjs/common";
import { Alarm } from "src/alarms/domain/alarm";
import { AlarmReadModel } from "src/alarms/domain/read-models/alarm.read-model";
import { AlarmMapper } from "../mappers/alarm.mapper";
import { AlarmWriteRepository } from "src/alarms/application/ports/alarm-write.repository";
import { AlarmEntity } from "../entities/alarm.entity";
import { randomUUID } from "crypto";
import { AlarmReadRepository } from "src/alarms/application/ports/alarm-read.repository";
import { MaterializedAlarmWriteRepository } from "src/alarms/application/ports/materialized-alarm-write.repository";

@Injectable()
export class InMemoryAlarmRepository
  implements
    AlarmWriteRepository,
    AlarmReadRepository,
    MaterializedAlarmWriteRepository
{
  private alarms: AlarmEntity[] = [];
  private materializedAlarmView = new Map<string, AlarmReadModel>();

  async save(alarm: Alarm) {
    const id = randomUUID();
    const alarmEntity = AlarmMapper.toPersistence(id, alarm);
    alarmEntity.items = alarmEntity.items.map((item) => ({
      ...item,
      id: randomUUID(),
    }));
    this.alarms.push(alarmEntity);
    return AlarmMapper.toDomain(alarmEntity);
  }

  async findAll() {
    return Array.from(this.materializedAlarmView.values());
  }

  async upsert(alarm: Pick<AlarmReadModel, "id"> & Partial<AlarmReadModel>) {
    if (this.materializedAlarmView.has(alarm.id)) {
      this.materializedAlarmView.set(alarm.id, {
        ...this.materializedAlarmView.get(alarm.id),
        ...alarm,
      });
      return;
    }
    this.materializedAlarmView.set(alarm.id, alarm as AlarmReadModel);
  }
}
