import { Module } from "@nestjs/common";
import { AlarmReadRepository } from "src/alarms/application/ports/alarm-read.repository";
import { AlarmWriteRepository } from "src/alarms/application/ports/alarm-write.repository";
import { MaterializedAlarmWriteRepository } from "src/alarms/application/ports/materialized-alarm-write.repository";
import { InMemoryAlarmRepository } from "./repositories/alarm.repository";

@Module({
  providers: [
    InMemoryAlarmRepository,
    {
      provide: AlarmWriteRepository,
      useExisting: InMemoryAlarmRepository,
    },
    {
      provide: AlarmReadRepository,
      useExisting: InMemoryAlarmRepository,
    },
    {
      provide: MaterializedAlarmWriteRepository,
      useExisting: InMemoryAlarmRepository,
    },
  ],
  exports: [
    AlarmWriteRepository,
    AlarmReadRepository,
    MaterializedAlarmWriteRepository,
  ],
})
export class InMemoryPersistenceModule {}
