import { Alarm } from "../../domain/alarm";

// Using abstract classes instead of interfaces because of typescript interfaces doesn't exist in runtime.
export abstract class AlarmWriteRepository {
  abstract save(alarm: Alarm): Promise<Alarm>;
}
