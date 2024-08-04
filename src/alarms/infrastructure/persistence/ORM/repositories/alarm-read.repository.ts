import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AlarmReadRepository } from "src/alarms/application/ports/alarm-read.repository";
import { MaterializedAlarmView } from "../schemas/materialized-alarm-view.schema";

@Injectable()
export class OrmAlarmReadRepository implements AlarmReadRepository {
  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly alarmModel: Model<MaterializedAlarmView>,
  ) {}

  async findAll(): Promise<MaterializedAlarmView[]> {
    return this.alarmModel.find();
  }
}
