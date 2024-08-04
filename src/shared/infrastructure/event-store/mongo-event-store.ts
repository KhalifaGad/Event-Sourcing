import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ClientSession } from "mongoose";
import { EVENT_STORE_CONNECTION } from "src/config/constants";
import { Event } from "./schemas/event.schema";

console.log("MongoEventStore: ", EVENT_STORE_CONNECTION);

@Injectable()
export class MongoEventStore {
  private logger = new Logger(MongoEventStore.name);

  constructor(
    @InjectModel(Event.name, EVENT_STORE_CONNECTION)
    private readonly eventStore: Model<Event>,
  ) {}

  async persist(eventOrEvents: Event | Event[]): Promise<void> {
    const events = Array.isArray(eventOrEvents)
      ? eventOrEvents
      : [eventOrEvents];
    const session = await this.eventStore.startSession();
    await this.persistEvents(events, session);
  }

  private async persistEvents(events: Event[], session: ClientSession) {
    try {
      session.startTransaction();
      await this.eventStore.insertMany(events, { session, ordered: true });

      await session.commitTransaction();
      this.logger.debug(`Events inserted successfully to the event store`);
    } catch (error) {
      await session.abortTransaction();

      const UNIQUE_CONSTRAINT_ERROR_CODE = 11000;
      if (error?.code === UNIQUE_CONSTRAINT_ERROR_CODE) {
        this.logger.error(`Events could not be persisted. Aggregate is stale.`);
        console.error(error.writeErrors?.[0]?.err?.errmsg);
      } else {
        throw error;
      }
      throw error;
    } finally {
      await session.endSession();
    }
  }
}
