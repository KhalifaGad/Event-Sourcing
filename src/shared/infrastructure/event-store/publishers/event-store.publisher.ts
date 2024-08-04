import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { EventBus, IEvent, IEventPublisher } from "@nestjs/cqrs";
import { VersionedAggregateRoot } from "src/shared/domain/aggregate-root";
import { EventSerializer } from "../serializers/event.serializer";
import { MongoEventStore } from "../mongo-event-store";

@Injectable()
export class EventStorePublisher
  implements OnApplicationBootstrap, IEventPublisher
{
  constructor(
    private readonly eventStore: MongoEventStore,
    private readonly eventBus: EventBus,
    private eventSerializer: EventSerializer,
  ) {}

  onApplicationBootstrap(): void {
    this.eventBus.publisher = this;
  }

  async publish<T extends IEvent = IEvent>(
    event: T,
    dispatcher: VersionedAggregateRoot,
  ): Promise<void> {
    const serializedEvent = this.eventSerializer.serialize(event, dispatcher);
    return this.eventStore.persist(serializedEvent);
  }

  async publishAll<T extends IEvent = IEvent>(
    events: T[],
    dispatcher: VersionedAggregateRoot,
  ): Promise<void> {
    const serializableEvents = events
      .map((event) => this.eventSerializer.serialize(event, dispatcher))
      .map((serializableEvent, index) => ({
        ...serializableEvent,
        position: dispatcher.version.value + index + 1,
      }));

    return this.eventStore.persist(serializableEvents);
  }
}
