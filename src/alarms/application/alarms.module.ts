import { DynamicModule, Module, Type } from "@nestjs/common";
import { AlarmCreatedEventHandler } from "./event-handlers/alarm-created.event-handler";
import { GetAlarmsQueryHandler } from "./queries/get-alarms.query-handler";
import { CreateAlarmCommandHandler } from "./commands/create-alarm.command-handler";
import { AlarmFactory } from "src/alarms/domain/factories/alarm.factory";
import { AlarmController } from "../presenters/http/alarm.controller";
import { AlarmFacade } from "src/alarms/application/alarm-facade";

@Module({
  controllers: [AlarmController],
  providers: [
    AlarmFacade,
    AlarmFactory,
    CreateAlarmCommandHandler,
    GetAlarmsQueryHandler,
    AlarmCreatedEventHandler,
  ],
})
export class AlarmsModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule) {
    return {
      module: AlarmsModule,
      imports: [infrastructureModule],
    };
  }
}
