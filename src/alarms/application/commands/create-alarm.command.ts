import { AlarmSeverityValue } from "src/alarms/domain/types";

export class CreateAlarmCommand {
  constructor(
    public readonly name: string,
    public readonly severity: AlarmSeverityValue,
    public readonly triggeredAt: Date,
    public readonly items: Array<{ name: string; type: string }>,
  ) {}
}
