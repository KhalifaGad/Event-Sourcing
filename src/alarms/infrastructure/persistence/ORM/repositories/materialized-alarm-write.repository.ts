import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MaterializedAlarmWriteRepository } from "src/alarms/application/ports/materialized-alarm-write.repository";
import { MaterializedAlarmView } from "../schemas/materialized-alarm-view.schema";

export class OrmMaterializedAlarmWriteRepository
  implements MaterializedAlarmWriteRepository
{
  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly alarmModel: Model<MaterializedAlarmView>,
  ) {}
  async upsert(
    alarm: Pick<MaterializedAlarmView, "id"> & Partial<MaterializedAlarmView>,
  ): Promise<void> {
    await this.alarmModel.findOneAndUpdate({ id: alarm.id }, alarm, {
      upsert: true,
    });
  }
}
