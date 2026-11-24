'use client';
import { IconButton } from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { palette } from '@leafygreen-ui/palette';
import { isSameDay } from '../utils/scheduler';
import { WAVE_COLORS, RELEASE_COLORS } from '../utils/waveColors';
import type { ScheduleEntry, WaveNumber } from '../types';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_HEADERS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function MongoDBUpdateBadge() {
  return (
    <div
      data-testid="release-badge"
      style={{
        backgroundColor: RELEASE_COLORS.bg,
        border: `1px solid ${RELEASE_COLORS.border}`,
        borderRadius: 4,
        padding: '3px 5px',
        fontSize: 8,
        fontWeight: 700,
        color: RELEASE_COLORS.text,
        textAlign: 'center',
        lineHeight: 1.3,
        letterSpacing: '0.01em',
        marginBottom: 3,
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        boxSizing: 'border-box' as const,
      }}
    >
      MongoDB update
    </div>
  );
}

interface CalendarPanelProps {
  releaseDate: Date | null;
  entries: ScheduleEntry[];
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
}

export function CalendarPanel({
  releaseDate,
  entries,
  year,
  month,
  onPrev,
  onNext,
}: CalendarPanelProps) {
  const today = new Date();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  function getChips(date: Date) {
    return entries
      .filter(e => isSameDay(e.datetime, date))
      .map(e => ({ projectId: e.projectId, projectName: e.projectName, wave: e.wave }));
  }

  const leadingBlanks = firstDayOfWeek;
  const trailingBlanks = (7 - ((leadingBlanks + daysInMonth) % 7)) % 7;
  const cells: (number | null)[] = [
    ...Array<null>(leadingBlanks).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ...Array<null>(trailingBlanks).fill(null),
  ];

  return (
    <div data-testid="calendar-panel">
      {/* Month navigation */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <IconButton aria-label="Previous month" onClick={onPrev}>
          <Icon glyph="ChevronLeft" />
        </IconButton>
        <span
          style={{
            fontSize: 17,
            fontWeight: 600,
            color: palette.gray.dark3,
            letterSpacing: '0.01em',
          }}
        >
          {MONTH_NAMES[month]} {year}
        </span>
        <IconButton aria-label="Next month" onClick={onNext}>
          <Icon glyph="ChevronRight" />
        </IconButton>
      </div>

      {/* Day-of-week headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 4 }}>
        {DAY_HEADERS.map(d => (
          <div
            key={d}
            style={{
              textAlign: 'center',
              fontSize: 11,
              fontWeight: 700,
              color: palette.gray.dark1,
              padding: '0 0 8px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 }}>
        {cells.map((day, i) => {
          if (day === null) {
            return (
              <div
                key={`empty-${i}`}
                style={{ minHeight: 68, backgroundColor: 'transparent' }}
                aria-hidden="true"
              />
            );
          }

          const date = new Date(year, month, day);
          const isToday = isSameDay(date, today);
          const isReleaseDay = releaseDate !== null && isSameDay(date, releaseDate);
          const chips = getChips(date);
          const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

          return (
            <div
              key={day}
              data-testid={`calendar-day-${dateKey}`}
              style={{
                backgroundColor: 'white',
                borderRadius: 6,
                border: `1px solid ${isToday ? palette.green.dark1 : palette.gray.light2}`,
                padding: '5px 0 4px',
                overflow: 'hidden',
                minHeight: 68,
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  fontSize: 13,
                  fontWeight: isToday ? 700 : 400,
                  color: isToday ? palette.green.dark1 : palette.gray.dark2,
                  padding: '0 4px',
                  marginBottom: isReleaseDay || chips.length > 0 ? 2 : 0,
                }}
              >
                {day}
              </div>

              {isReleaseDay && (
                <div style={{ padding: '0 5px' }}>
                  <MongoDBUpdateBadge />
                </div>
              )}

              {chips.map(chip => (
                <div
                  key={chip.projectId}
                  title={`${chip.projectName} — ${WAVE_COLORS[chip.wave as WaveNumber].label}`}
                  data-testid={`wave-chip-${chip.wave}`}
                  style={{
                    backgroundColor: WAVE_COLORS[chip.wave as WaveNumber].dot,
                    color: 'white',
                    borderRadius: 10,
                    padding: '2px 6px',
                    fontSize: 9,
                    fontWeight: 700,
                    margin: '2px 3px 0',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: 'calc(100% - 6px)',
                  }}
                >
                  {chip.projectName}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
