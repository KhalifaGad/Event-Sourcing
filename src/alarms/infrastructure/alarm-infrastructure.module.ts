import { Module } from "@nestjs/common";
import { SharedModule } from "src/shared/shared.module";
import { InMemoryPersistenceModule } from "./in-memory/in-memory-persistence.module";
import { OrmPersistenceModule } from "./persistence/ORM/orm-persistence.module";

@Module({
  imports: [SharedModule],
  exports: [SharedModule],
})
export class AlarmInfrastructureModule {
  static use(driver: "orm" | "in-memory") {
    const persistenceModule =
      driver === "orm" ? OrmPersistenceModule : InMemoryPersistenceModule;

    return {
      module: AlarmInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
