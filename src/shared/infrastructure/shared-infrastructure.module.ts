import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MongoEventStore } from "./event-store/mongo-event-store";
import { EventStorePublisher } from "./event-store/publishers/event-store.publisher";
import { Event, EventSchema } from "./event-store/schemas/event.schema";
import { EventSerializer } from "./event-store/serializers/event.serializer";
import { EVENT_STORE_CONNECTION } from "src/config/constants";

console.log("shared infrastructure module: ", EVENT_STORE_CONNECTION);

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Event.name, schema: EventSchema }],
      EVENT_STORE_CONNECTION,
    ),
  ],
  providers: [EventSerializer, EventStorePublisher, MongoEventStore],
})
export class SharedInfrastructureModule {}
