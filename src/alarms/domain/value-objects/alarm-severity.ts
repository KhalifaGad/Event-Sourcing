import { AlarmSeverityValue } from '../types';

export class AlarmSeverity {
  constructor(public readonly value: AlarmSeverityValue) {}

  equals(severity: AlarmSeverity): boolean {
    return this.value === severity.value;
  }
}
