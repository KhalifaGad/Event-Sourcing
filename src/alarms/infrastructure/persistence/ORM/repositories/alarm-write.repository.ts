import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Alarm } from "src/alarms/domain/alarm";
import { AlarmMapper } from "../mappers/alarm.mapper";
import { Repository } from "typeorm";
import { AlarmWriteRepository } from "src/alarms/application/ports/alarm-write.repository";
import { AlarmEntity } from "../entities/alarm.entity";

@Injectable()
export class OrmAlarmWriteRepository implements AlarmWriteRepository {
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly alarmRepository: Repository<AlarmEntity>,
  ) {}

  async save(alarm: Alarm) {
    const persistentModel = AlarmMapper.toPersistence(alarm);
    const alarmEntity = await this.alarmRepository.save({
      ...persistentModel,
      id: alarm.id ?? undefined,
      items: persistentModel.items.map((item) => ({
        ...item,
        id: item.id ?? undefined,
      })),
    });
    return AlarmMapper.toDomain(alarmEntity);
  }
}
