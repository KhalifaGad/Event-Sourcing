import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetAlarmsQuery } from "./queries/get-alarms.query";
import { CreateAlarmCommand } from "./commands/create-alarm.command";
import { Alarm } from "src/alarms/domain/alarm";

@Injectable()
export class AlarmFacade {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async create(command: CreateAlarmCommand): Promise<Alarm> {
    return this.commandBus.execute(command);
  }

  async findAll(): Promise<Alarm[]> {
    return this.queryBus.execute(new GetAlarmsQuery());
  }
}
