'use client';
import { useState } from 'react';
import { IconButton } from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { palette } from '@leafygreen-ui/palette';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_HEADERS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function toDateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function formatDisplay(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return `${MONTH_SHORT[m - 1]} ${d}, ${y}`;
}

interface DateSelectPickerProps {
  value: string; // YYYY-MM-DD or ''
  onChange: (v: string) => void;
}

/**
 * Date picker dropdown where only days 1–7 of each month are selectable.
 * Days 8+ are visually disabled (grayed out, not-allowed cursor).
 */
export function DateSelectPicker({ value, onChange }: DateSelectPickerProps) {
  const today = new Date();
  const [isOpen, setIsOpen] = useState(false);

  const initYear = value ? Number(value.slice(0, 4)) : today.getFullYear();
  const initMonth = value ? Number(value.slice(5, 7)) - 1 : today.getMonth();
  const [displayYear, setDisplayYear] = useState(initYear);
  const [displayMonth, setDisplayMonth] = useState(initMonth);

  function prevMonth(e: React.MouseEvent) {
    e.stopPropagation();
    if (displayMonth === 0) {
      setDisplayYear(y => y - 1);
      setDisplayMonth(11);
    } else {
      setDisplayMonth(m => m - 1);
    }
  }

  function nextMonth(e: React.MouseEvent) {
    e.stopPropagation();
    if (displayMonth === 11) {
      setDisplayYear(y => y + 1);
      setDisplayMonth(0);
    } else {
      setDisplayMonth(m => m + 1);
    }
  }

  function select(dateStr: string) {
    onChange(dateStr);
    setIsOpen(false);
  }

  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
  const firstDay = new Date(displayYear, displayMonth, 1).getDay();
  const cells: (number | null)[] = [
    ...Array<null>(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div style={{ position: 'relative' }} data-testid="date-select-picker">
      <button
        type="button"
        aria-label="Release date"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(o => !o)}
        style={{
          width: '100%',
          height: 36,
          padding: '0 10px',
          border: `1px solid ${isOpen ? palette.blue.base : palette.gray.base}`,
          borderRadius: 6,
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          fontSize: 13,
          fontFamily: 'inherit',
          color: value ? palette.gray.dark3 : palette.gray.base,
          outline: 'none',
        }}
      >
        <span>{value ? formatDisplay(value) : 'Select a date'}</span>
        <span style={{ fontSize: 10, color: palette.gray.dark1, marginLeft: 6 }}>▾</span>
      </button>

      {isOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 99 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            zIndex: 100,
            backgroundColor: 'white',
            border: `1px solid ${palette.gray.light2}`,
            borderRadius: 8,
            boxShadow: '0 4px 20px rgba(0,0,0,0.14)',
            padding: '12px 14px 14px',
            minWidth: 240,
          }}
          onClick={e => e.stopPropagation()}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <IconButton aria-label="Previous month" onClick={prevMonth}>
              <Icon glyph="ChevronLeft" />
            </IconButton>
            <span style={{ fontSize: 13, fontWeight: 600, color: palette.gray.dark3 }}>
              {MONTH_NAMES[displayMonth]} {displayYear}
            </span>
            <IconButton aria-label="Next month" onClick={nextMonth}>
              <Icon glyph="ChevronRight" />
            </IconButton>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 2,
              marginBottom: 4,
            }}
          >
            {DAY_HEADERS.map(d => (
              <div
                key={d}
                style={{
                  textAlign: 'center',
                  fontSize: 10,
                  fontWeight: 700,
                  color: palette.gray.dark1,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.04em',
                  padding: '2px 0',
                }}
              >
                {d}
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {cells.map((day, i) => {
              if (day === null) return <div key={`e-${i}`} style={{ height: 30 }} />;

              const selectable = day <= 7;
              const dateStr = toDateStr(displayYear, displayMonth, day);
              const isSelected = value === dateStr;
              const isToday =
                today.getFullYear() === displayYear &&
                today.getMonth() === displayMonth &&
                today.getDate() === day;

              return (
                <div
                  key={day}
                  role={selectable ? 'button' : undefined}
                  aria-label={selectable ? `${MONTH_NAMES[displayMonth]} ${day}, ${displayYear}` : undefined}
                  aria-disabled={!selectable}
                  onClick={() => selectable && select(dateStr)}
                  style={{
                    height: 30,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: isSelected ? 700 : 400,
                    cursor: selectable ? 'pointer' : 'not-allowed',
                    backgroundColor: isSelected
                      ? palette.green.dark1
                      : selectable
                        ? 'transparent'
                        : palette.gray.light2,
                    color: isSelected
                      ? 'white'
                      : selectable
                        ? palette.gray.dark3
                        : palette.gray.base,
                    border:
                      !isSelected && isToday && selectable
                        ? `1px solid ${palette.green.dark1}`
                        : '1px solid transparent',
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
