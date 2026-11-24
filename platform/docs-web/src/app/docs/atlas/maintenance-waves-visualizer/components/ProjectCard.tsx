'use client';
import Card from '@leafygreen-ui/card';
import { IconButton } from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { Option, Select } from '@leafygreen-ui/select';
import { palette } from '@leafygreen-ui/palette';
import { WAVE_COLORS } from '../utils/waveColors';
import { TIME_OPTIONS_30MIN } from '../utils/timeOptions';
import type { DayOfWeek, Project, WaveNumber } from '../types';

const DAY_OPTIONS = [
  { value: '0', label: 'Sunday' },
  { value: '1', label: 'Monday' },
  { value: '2', label: 'Tuesday' },
  { value: '3', label: 'Wednesday' },
  { value: '4', label: 'Thursday' },
  { value: '5', label: 'Friday' },
  { value: '6', label: 'Saturday' },
];

const WAVE_OPTIONS = [
  { value: '1', label: 'Wave 1' },
  { value: '2', label: 'Wave 2' },
  { value: '3', label: 'Wave 3' },
];

interface ProjectCardProps {
  project: Project;
  onChange: (updated: Project) => void;
  onRemove: () => void;
}

export function ProjectCard({ project, onChange, onRemove }: ProjectCardProps) {
  const dotColor = project.wave !== null ? WAVE_COLORS[project.wave].dot : palette.gray.light1;

  return (
    <Card data-testid="project-card">
      <div style={{ padding: '4px 4px 8px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 14,
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: palette.gray.dark4,
              letterSpacing: '-0.01em',
              lineHeight: 1.3,
            }}
          >
            {project.name}
          </span>
          <IconButton aria-label={`Remove ${project.name}`} onClick={onRemove}>
            <Icon glyph="Trash" />
          </IconButton>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Select
            label="Maintenance Window"
            placeholder="Select a day"
            value={project.maintenanceDay !== null ? String(project.maintenanceDay) : ''}
            onChange={v =>
              onChange({
                ...project,
                maintenanceDay: v === '' ? null : (Number(v) as DayOfWeek),
              })
            }
            size="small"
          >
            {DAY_OPTIONS.map(opt => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>

          <Select
            label="Start Time"
            placeholder="Select a time"
            value={project.timeOfDay ?? ''}
            onChange={v => onChange({ ...project, timeOfDay: v || null })}
            size="small"
          >
            {TIME_OPTIONS_30MIN.map(opt => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>

          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: dotColor,
                  flexShrink: 0,
                  transition: 'background-color 0.15s',
                }}
                aria-label={project.wave !== null ? `Wave ${project.wave}` : 'No wave selected'}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: palette.gray.dark2,
                  lineHeight: 1,
                }}
              >
                Wave
              </span>
            </div>
            <Select
              label=""
              aria-label="Wave assignment"
              placeholder="Select a wave"
              value={project.wave !== null ? String(project.wave) : ''}
              onChange={v =>
                onChange({
                  ...project,
                  wave: v === '' ? null : (Number(v) as WaveNumber),
                })
              }
              size="small"
            >
              {WAVE_OPTIONS.map(opt => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
}
