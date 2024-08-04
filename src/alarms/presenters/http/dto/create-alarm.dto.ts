import { AlarmSeverityValue } from "src/alarms/domain/types";

export class CreateAlarmDto {
  name: string;
  severity: AlarmSeverityValue;
  triggeredAt: Date;
  items: Array<{ name: string; type: string }>;
}
