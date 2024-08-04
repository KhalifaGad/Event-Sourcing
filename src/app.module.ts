import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { AlarmInfrastructureModule } from "src/alarms/infrastructure/alarm-infrastructure.module";
import { ConfigurationModule } from "./config/configuration.module";
import { AlarmsModule } from "src/alarms/application/alarms.module";
import { ApplicationBootstrapOptions } from "./common/interfaces/application-bootstrap.options";

@Module({
  imports: [CqrsModule.forRoot()],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        ConfigurationModule.forRoot(options),
        AlarmsModule.withInfrastructure(
          AlarmInfrastructureModule.use(options.driver),
        ),
      ],
    };
  }
}
