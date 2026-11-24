import type { Project, WaveNumber } from '../../types';
import { calculateSchedule, findNextDayOfWeekAtTime, isSameDay } from '../../utils/scheduler';

// Jan 3, 2026 (Saturday) at midnight
const saturdayMidnight = new Date(2026, 0, 3, 0, 0, 0, 0);

// w1Min = Jan 5 Mon 00:00.
// Using Tue/Fri/Mon avoids landing exactly on the 48h boundary so each
// project is accepted on first occurrence without cascading to the next week.
const defaultProjects: Project[] = [
  { id: 'a', name: 'Project A', maintenanceDay: 2, timeOfDay: '00:00', wave: 1 }, // Tuesday
  { id: 'b', name: 'Project B', maintenanceDay: 5, timeOfDay: '00:00', wave: 2 }, // Friday
  { id: 'c', name: 'Project C', maintenanceDay: 1, timeOfDay: '00:00', wave: 3 }, // Monday
];

describe('findNextDayOfWeekAtTime', () => {
  it('returns the same day when the target time is strictly after the minimum', () => {
    // min = Jan 5 Mon 00:00; find Monday at 01:00 → Jan 5 01:00 > min ✓
    const min = new Date(2026, 0, 5, 0, 0, 0, 0);
    expect(findNextDayOfWeekAtTime(min, 1, 1, 0)).toEqual(new Date(2026, 0, 5, 1, 0, 0, 0));
  });

  it('rejects a candidate that lands exactly at the minimum (strictly greater than)', () => {
    // min = Jan 5 Mon 00:00; find Monday at 00:00 → exactly at boundary → advance to Jan 12
    const min = new Date(2026, 0, 5, 0, 0, 0, 0);
    expect(findNextDayOfWeekAtTime(min, 1, 0, 0)).toEqual(new Date(2026, 0, 12, 0, 0, 0, 0));
  });

  it('advances a full week when the target time is before the minimum', () => {
    // min = Jan 5 Mon 06:00; find Monday at 01:00 → Jan 5 01:00 < min → Jan 12 01:00
    const min = new Date(2026, 0, 5, 6, 0, 0, 0);
    expect(findNextDayOfWeekAtTime(min, 1, 1, 0)).toEqual(new Date(2026, 0, 12, 1, 0, 0, 0));
  });

  it('handles 30-minute granularity', () => {
    // min = Jan 5 Mon 00:00; find Monday at 06:30 → Jan 5 06:30 ✓
    const min = new Date(2026, 0, 5, 0, 0, 0, 0);
    expect(findNextDayOfWeekAtTime(min, 1, 6, 30)).toEqual(new Date(2026, 0, 5, 6, 30, 0, 0));
  });
});

describe('isSameDay', () => {
  it('returns true for the same calendar day', () => {
    expect(isSameDay(new Date(2026, 0, 5, 10, 0), new Date(2026, 0, 5, 22, 0))).toBe(true);
  });

  it('returns false for different calendar days', () => {
    expect(isSameDay(new Date(2026, 0, 5), new Date(2026, 0, 6))).toBe(false);
  });
});

describe('calculateSchedule', () => {
  // Release: Jan 3 Sat 00:00 → w1Min = Jan 5 Mon 00:00
  // Wave 1 (Tue): Jan 6 00:00 (one day past boundary)
  // Wave 2 (Fri): w2Min = Jan 6 + 48h = Jan 8 Thu 00:00 → Jan 9 Fri 00:00
  // Wave 3 (Mon): w3Min = Jan 9 + 48h = Jan 11 Sun 00:00 → Jan 12 Mon 00:00

  it('schedules wave 1 strictly more than 48h after release on the configured day', () => {
    const entries = calculateSchedule(saturdayMidnight, defaultProjects);
    expect(entries.find(e => e.wave === 1)!.datetime).toEqual(new Date(2026, 0, 6, 0, 0, 0, 0));
  });

  it('schedules wave 2 strictly more than 48h after the wave 1 latest', () => {
    const entries = calculateSchedule(saturdayMidnight, defaultProjects);
    expect(entries.find(e => e.wave === 2)!.datetime).toEqual(new Date(2026, 0, 9, 0, 0, 0, 0));
  });

  it('schedules wave 3 strictly more than 48h after the wave 2 latest', () => {
    const entries = calculateSchedule(saturdayMidnight, defaultProjects);
    expect(entries.find(e => e.wave === 3)!.datetime).toEqual(new Date(2026, 0, 12, 0, 0, 0, 0));
  });

  it('advances to the next occurrence when a project lands exactly at the 48h boundary', () => {
    // w1Min = Jan 5 Mon 00:00; Monday at 00:00 is exactly at boundary → Jan 12
    const projects: Project[] = [
      { id: 'a', name: 'Project A', maintenanceDay: 1, timeOfDay: '00:00', wave: 1 },
    ];
    const entries = calculateSchedule(saturdayMidnight, projects);
    expect(entries[0].datetime).toEqual(new Date(2026, 0, 12, 0, 0, 0, 0));
  });

  it('skips projects where maintenanceDay is null', () => {
    const projects: Project[] = [
      { id: 'a', name: 'Project A', maintenanceDay: null, timeOfDay: '00:00', wave: 1 },
    ];
    expect(calculateSchedule(saturdayMidnight, projects)).toHaveLength(0);
  });

  it('skips projects where wave is null', () => {
    const projects: Project[] = [
      { id: 'a', name: 'Project A', maintenanceDay: 2, timeOfDay: '00:00', wave: null },
    ];
    expect(calculateSchedule(saturdayMidnight, projects)).toHaveLength(0);
  });

  it('treats null timeOfDay as midnight (00:00)', () => {
    // Tuesday at null → 00:00; Jan 6 Tue 00:00 > w1Min Jan 5 Mon 00:00 ✓
    const projects: Project[] = [
      { id: 'a', name: 'Project A', maintenanceDay: 2, timeOfDay: null, wave: 1 },
    ];
    const entries = calculateSchedule(saturdayMidnight, projects);
    expect(entries[0].datetime).toEqual(new Date(2026, 0, 6, 0, 0, 0, 0));
  });

  it('parses timeOfDay string with 30-minute granularity', () => {
    const projects: Project[] = [
      { id: 'a', name: 'Project A', maintenanceDay: 2, timeOfDay: '06:30', wave: 1 },
    ];
    const entries = calculateSchedule(saturdayMidnight, projects);
    expect(entries[0].datetime).toEqual(new Date(2026, 0, 6, 6, 30, 0, 0));
  });

  it('advances to next occurrence when configured time lands before the 48h minimum', () => {
    // Release: Jan 1 Thu 20:00; w1Min = Jan 3 Sat 20:00
    // Monday at 06:00: first Mon from Jan 3 = Jan 5; Jan 5 06:00 > Jan 3 20:00 → Jan 5 06:00 ✓
    const releaseDate = new Date(2026, 0, 1, 20, 0, 0, 0);
    const projects: Project[] = [
      { id: 'a', name: 'Project A', maintenanceDay: 1, timeOfDay: '06:00', wave: 1 },
    ];
    const entries = calculateSchedule(releaseDate, projects);
    expect(entries[0].datetime).toEqual(new Date(2026, 0, 5, 6, 0, 0, 0));
  });

  it('advances across weeks when the configured day has already passed', () => {
    // Release: Jan 7 Wed 23:00; w1Min = Jan 9 Fri 23:00
    // Thursday at 01:00: next Thu from Jan 9 Fri = Jan 15; Jan 15 01:00 > Jan 9 23:00 → Jan 15 ✓
    const releaseDate = new Date(2026, 0, 7, 23, 0, 0, 0);
    const projects: Project[] = [
      { id: 'a', name: 'Project A', maintenanceDay: 4, timeOfDay: '01:00', wave: 1 },
    ];
    const entries = calculateSchedule(releaseDate, projects);
    expect(entries[0].datetime).toEqual(new Date(2026, 0, 15, 1, 0, 0, 0));
  });

  it('calculates multiple wave 1 projects independently from the same reference', () => {
    const projects: Project[] = [
      { id: 'a', name: 'Project A', maintenanceDay: 2, timeOfDay: '00:00', wave: 1 }, // Tue
      { id: 'b', name: 'Project B', maintenanceDay: 3, timeOfDay: '00:00', wave: 1 }, // Wed
    ];
    const entries = calculateSchedule(saturdayMidnight, projects);
    expect(entries.find(e => e.projectId === 'a')!.datetime).toEqual(new Date(2026, 0, 6, 0, 0, 0, 0));
    expect(entries.find(e => e.projectId === 'b')!.datetime).toEqual(new Date(2026, 0, 7, 0, 0, 0, 0));
  });

  it('uses the latest project in wave N as the reference for wave N+1', () => {
    const projects: Project[] = [
      { id: 'a', name: 'Project A', maintenanceDay: 2, timeOfDay: '00:00', wave: 1 }, // Tue Jan 6
      { id: 'b', name: 'Project B', maintenanceDay: 3, timeOfDay: '00:00', wave: 1 }, // Wed Jan 7 (latest)
      { id: 'c', name: 'Project C', maintenanceDay: 6, timeOfDay: '00:00', wave: 2 }, // Sat
    ];
    const entries = calculateSchedule(saturdayMidnight, projects);
    // Wave 1 latest = Jan 7 Wed; w2Min = Jan 9 Fri 00:00; next Sat = Jan 10 ✓
    expect(entries.find(e => e.wave === 2)!.datetime).toEqual(new Date(2026, 0, 10, 0, 0, 0, 0));
  });

  it('skips empty waves and falls back to the previous wave for the reference', () => {
    const projects: Project[] = [
      { id: 'a', name: 'Project A', maintenanceDay: 2, timeOfDay: '00:00', wave: 1 }, // Tue Jan 6
      { id: 'c', name: 'Project C', maintenanceDay: 5, timeOfDay: '00:00', wave: 3 }, // Fri (wave 2 empty)
    ];
    const entries = calculateSchedule(saturdayMidnight, projects);
    expect(entries).toHaveLength(2);
    // w1Latest = Jan 6; w2Min = Jan 8 Thu 00:00; w3Min = Jan 8 (no wave 2)
    // Fri from Jan 8 Thu = Jan 9 Fri; Jan 9 > Jan 8 → Jan 9 ✓
    expect(entries.find(e => e.wave === 3)!.datetime).toEqual(new Date(2026, 0, 9, 0, 0, 0, 0));
  });

  it('returns an empty array when there are no projects', () => {
    expect(calculateSchedule(saturdayMidnight, [])).toHaveLength(0);
  });

  it('handles all projects in wave 1 scheduled to the same day', () => {
    const projects: Project[] = [
      { id: 'a', name: 'Project A', maintenanceDay: 2, timeOfDay: '00:00', wave: 1 },
      { id: 'b', name: 'Project B', maintenanceDay: 2, timeOfDay: '00:00', wave: 1 },
      { id: 'c', name: 'Project C', maintenanceDay: 2, timeOfDay: '00:00', wave: 1 },
    ];
    const entries = calculateSchedule(saturdayMidnight, projects);
    expect(entries).toHaveLength(3);
    entries.forEach(e => {
      expect(e.datetime).toEqual(new Date(2026, 0, 6, 0, 0, 0, 0)); // Tue Jan 6
    });
  });
});
