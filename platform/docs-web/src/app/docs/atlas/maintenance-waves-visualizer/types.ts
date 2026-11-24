export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type WaveNumber = 1 | 2 | 3;

export interface Project {
  id: string;
  name: string;
  maintenanceDay: DayOfWeek | null;
  timeOfDay: string | null; // "HH:MM" 24-hour, e.g. "14:30"
  wave: WaveNumber | null;
}

export interface ScheduleEntry {
  projectId: string;
  projectName: string;
  wave: WaveNumber;
  datetime: Date;
}
