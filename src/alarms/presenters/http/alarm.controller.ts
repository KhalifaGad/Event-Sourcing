import { Body, Controller, Get, Post } from "@nestjs/common";
import { AlarmFacade } from "src/alarms/application/alarm-facade";
import { CreateAlarmCommand } from "src/alarms/application/commands/create-alarm.command";
import { CreateAlarmDto } from "./dto/create-alarm.dto";

@Controller("alarms")
export class AlarmController {
  constructor(private readonly alarmFacade: AlarmFacade) {}

  @Post()
  async create(@Body() payload: CreateAlarmDto) {
    return this.alarmFacade.create(
      new CreateAlarmCommand(
        payload.name,
        payload.severity,
        payload.triggeredAt,
        payload.items,
      ),
    );
  }

  @Get()
  async findAll() {
    return this.alarmFacade.findAll();
  }
}
