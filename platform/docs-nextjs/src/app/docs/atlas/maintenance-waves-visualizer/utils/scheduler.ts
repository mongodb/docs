import type { Project, ScheduleEntry, WaveNumber } from '../types';

const MS_48H = 48 * 60 * 60 * 1000;

function parseTimeOfDay(timeOfDay: string | null): [number, number] {
  if (!timeOfDay) return [0, 0];
  const [h, m] = timeOfDay.split(':').map(Number);
  return [h, m];
}

/**
 * Find the first occurrence of dayOfWeek at hour:minute that is strictly
 * after minDatetime. A candidate landing exactly at minDatetime is rejected
 * and advanced by one full week.
 */
export function findNextDayOfWeekAtTime(
  minDatetime: Date,
  dayOfWeek: number,
  hour: number,
  minute: number,
): Date {
  const startDay = new Date(minDatetime);
  startDay.setHours(0, 0, 0, 0);

  const daysUntil = (dayOfWeek - startDay.getDay() + 7) % 7;
  const target = new Date(startDay);
  target.setDate(target.getDate() + daysUntil);
  target.setHours(hour, minute, 0, 0);

  if (target.getTime() <= minDatetime.getTime()) {
    target.setDate(target.getDate() + 7);
  }

  return target;
}

function latestOf(dates: Date[]): Date | null {
  if (!dates.length) return null;
  return dates.reduce((max, d) => (d > max ? d : max));
}

export function calculateSchedule(
  releaseDateTime: Date,
  projects: Project[],
): ScheduleEntry[] {
  const results: ScheduleEntry[] = [];

  const w1Min = new Date(releaseDateTime.getTime() + MS_48H);

  for (const p of projects.filter(p => p.wave === 1 && p.maintenanceDay !== null)) {
    const [h, m] = parseTimeOfDay(p.timeOfDay);
    results.push({
      projectId: p.id,
      projectName: p.name,
      wave: 1 as WaveNumber,
      datetime: findNextDayOfWeekAtTime(w1Min, p.maintenanceDay!, h, m),
    });
  }

  const w1Latest = latestOf(results.filter(r => r.wave === 1).map(r => r.datetime));
  const w2Min = w1Latest ? new Date(w1Latest.getTime() + MS_48H) : w1Min;

  for (const p of projects.filter(p => p.wave === 2 && p.maintenanceDay !== null)) {
    const [h, m] = parseTimeOfDay(p.timeOfDay);
    results.push({
      projectId: p.id,
      projectName: p.name,
      wave: 2 as WaveNumber,
      datetime: findNextDayOfWeekAtTime(w2Min, p.maintenanceDay!, h, m),
    });
  }

  const w2Latest = latestOf(results.filter(r => r.wave === 2).map(r => r.datetime));
  const w3Min = w2Latest ? new Date(w2Latest.getTime() + MS_48H) : w2Min;

  for (const p of projects.filter(p => p.wave === 3 && p.maintenanceDay !== null)) {
    const [h, m] = parseTimeOfDay(p.timeOfDay);
    results.push({
      projectId: p.id,
      projectName: p.name,
      wave: 3 as WaveNumber,
      datetime: findNextDayOfWeekAtTime(w3Min, p.maintenanceDay!, h, m),
    });
  }

  return results;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
