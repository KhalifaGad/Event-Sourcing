import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { AlarmReadModel } from "src/alarms/domain/read-models/alarm.read-model";
import { AlarmReadRepository } from "../ports/alarm-read.repository";
import { GetAlarmsQuery } from "./get-alarms.query";

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler
  implements IQueryHandler<GetAlarmsQuery, AlarmReadModel[]>
{
  constructor(private readonly alarmRepository: AlarmReadRepository) {
    this.alarmRepository = alarmRepository;
  }
  async execute(): Promise<AlarmReadModel[]> {
    return this.alarmRepository.findAll();
  }
}
