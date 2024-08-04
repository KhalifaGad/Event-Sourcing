import {
  DynamicModule,
  Global,
  InternalServerErrorException,
  Module,
} from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationBootstrapOptions } from "src/common/interfaces/application-bootstrap.options";
import { EVENT_STORE_CONNECTION } from "src/config/constants";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import configuration, { IPostgresDatabaseConfig } from "./configuration";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: ".env",
    }),
    MongooseModule.forRoot(configuration().mongoEventStoreUri, {
      connectionName: EVENT_STORE_CONNECTION,
      directConnection: true,
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigurationModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    const imports: DynamicModule[] = [];

    if (options.driver === "orm") {
      imports.push(
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => {
            const databaseConfig =
              configService.get<IPostgresDatabaseConfig>("postgres");
            if (!databaseConfig)
              throw new InternalServerErrorException(
                "Cannot find database configuration",
              );

            return {
              type: "postgres",
              debug: true,
              host: databaseConfig.host,
              port: databaseConfig.port,
              username: databaseConfig.username,
              password: databaseConfig.password,
              database: databaseConfig.name,
              synchronize: true,
              autoLoadEntities: true,
              namingStrategy: new SnakeNamingStrategy(),
            };
          },
          inject: [ConfigService],
        }),
      );

      imports.push(
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => {
            return {
              uri: configService.get<string>("mongoReadUri"),
            };
          },
          inject: [ConfigService],
        }),
      );
    }

    return {
      module: ConfigurationModule,
      imports,
    };
  }
}
