import { AlarmReadModel } from "src/alarms/domain/read-models/alarm.read-model";

export abstract class MaterializedAlarmWriteRepository {
  abstract upsert(
    alarm: Pick<AlarmReadModel, "id"> & Partial<AlarmReadModel>,
  ): Promise<void>;
}
