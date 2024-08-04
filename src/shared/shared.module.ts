// 1. event mongo schema that would represent the event store in the database
// 2. serializers and deserializers to convert events to and from JSON.
// 3. to connect the in memory event stream to the data store we need to implement a publisher class or hookup to the cqrs module
// 4. we need a class to store and retrieve events from the event store

import { Module } from "@nestjs/common";
import { SharedInfrastructureModule } from "./infrastructure/shared-infrastructure.module";

@Module({
  imports: [SharedInfrastructureModule],
  exports: [SharedInfrastructureModule],
})
export class SharedModule {}
