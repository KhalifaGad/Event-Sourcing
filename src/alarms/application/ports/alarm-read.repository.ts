import { AlarmReadModel } from "../../domain/read-models/alarm.read-model";

// Using abstract classes instead of interfaces because of typescript interfaces doesn't exist in runtime.
export abstract class AlarmReadRepository {
  abstract findAll(): Promise<AlarmReadModel[]>;
}
