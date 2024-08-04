import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlarmWriteRepository } from "src/alarms/application/ports/alarm-write.repository";
import { AlarmReadRepository } from "src/alarms/application/ports/alarm-read.repository";
import { MaterializedAlarmWriteRepository } from "src/alarms/application/ports/materialized-alarm-write.repository";
import {
  MaterializedAlarmView,
  MaterializedAlarmViewSchema,
} from "./schemas/materialized-alarm-view.schema";
import { OrmAlarmWriteRepository } from "./repositories/alarm-write.repository";
import { OrmAlarmReadRepository } from "./repositories/alarm-read.repository";
import { OrmMaterializedAlarmWriteRepository } from "./repositories/materialized-alarm-write.repository";
import { AlarmItemEntity } from "./entities/alarm-item.entity";
import { AlarmEntity } from "./entities/alarm.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([AlarmEntity, AlarmItemEntity]),
    MongooseModule.forFeature([
      { name: MaterializedAlarmView.name, schema: MaterializedAlarmViewSchema },
    ]),
  ],
  providers: [
    {
      provide: AlarmWriteRepository,
      useClass: OrmAlarmWriteRepository,
    },
    {
      provide: AlarmReadRepository,
      useClass: OrmAlarmReadRepository,
    },
    {
      provide: MaterializedAlarmWriteRepository,
      useClass: OrmMaterializedAlarmWriteRepository,
    },
  ],
  exports: [
    AlarmWriteRepository,
    AlarmReadRepository,
    MaterializedAlarmWriteRepository,
  ],
})
export class OrmPersistenceModule {}
