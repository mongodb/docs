'use client';
import { useState, useMemo } from 'react';
import Button from '@leafygreen-ui/button';
import Banner from '@leafygreen-ui/banner';
import { Option, Select } from '@leafygreen-ui/select';
import { H2, Body } from '@leafygreen-ui/typography';
import { palette } from '@leafygreen-ui/palette';
import { theme } from '@/styles/theme';
import { css, cx } from '@leafygreen-ui/emotion';
import type { Project, WaveNumber } from '../types';
import { calculateSchedule } from '../utils/scheduler';
import { TIME_OPTIONS_30MIN } from '../utils/timeOptions';
import { CalendarPanel } from './CalendarPanel';
import { DateSelectPicker } from './DateSelectPicker';
import { ProjectCard } from './ProjectCard';

const MAX_PROJECTS = 5;

let _nextId = 2;
function genId() {
  return String(_nextId++);
}

const DEFAULT_PROJECT: Project = {
  id: '1',
  name: 'Project 1',
  maintenanceDay: null,
  timeOfDay: null,
  wave: null,
};

const pageStyle = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${palette.gray.light3};
  font-family: 'Euclid Circular A', 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const mainStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 28px 16px;
  max-width: 1400px;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  align-items: flex-start;

  @media ${theme.screenSize.largeAndUp} {
    flex-direction: row;
    padding: 28px 32px;
  }
`;

const asideStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${theme.screenSize.largeAndUp} {
    width: 360px;
    flex-shrink: 0;
  }
`;

const sectionContentStyle = css`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const releaseCardStyle = css`
  background-color: white;
  border-radius: 8px;
  border: 1px solid ${palette.gray.light2};
  padding: 14px 16px;
`;

const releaseTitleStyle = css`
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: ${palette.gray.dark4};
  letter-spacing: -0.01em;
  line-height: 1.3;
  margin-bottom: 14px;
`;

const releaseLabelStyle = css`
  font-size: 13px;
  font-weight: 600;
  color: ${palette.gray.dark2};
  margin-bottom: 6px;
`;

const calendarCardStyle = css`
  background-color: white;
  border-radius: 12px;
  padding: 24px 20px;
  border: 1px solid ${palette.gray.light2};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
`;

export function MaintenanceScheduler() {
  const now = new Date();
  const [projects, setProjects] = useState<Project[]>([DEFAULT_PROJECT]);
  const [projectCounter, setProjectCounter] = useState(2);
  const [releaseDateStr, setReleaseDateStr] = useState('');
  const [releaseTimeStr, setReleaseTimeStr] = useState('');
  const [calendarYear, setCalendarYear] = useState(now.getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(now.getMonth());

  const releaseDate = useMemo(() => {
    if (!releaseDateStr) return null;
    const [y, m, d] = releaseDateStr.split('-').map(Number);
    const dt = new Date(y, m - 1, d);
    if (releaseTimeStr) {
      const [h, min] = releaseTimeStr.split(':').map(Number);
      dt.setHours(h, min, 0, 0);
    }
    return dt;
  }, [releaseDateStr, releaseTimeStr]);

  const entries = useMemo(() => {
    if (!releaseDate) return [];
    return calculateSchedule(releaseDate, projects);
  }, [releaseDate, projects]);

  function addProject() {
    if (projects.length >= MAX_PROJECTS) return;
    setProjects(prev => [
      ...prev,
      { id: genId(), name: `Project ${projectCounter}`, maintenanceDay: null, timeOfDay: null, wave: null },
    ]);
    setProjectCounter(n => n + 1);
  }

  function updateProject(updated: Project) {
    setProjects(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  }

  function removeProject(id: string) {
    setProjects(prev => prev.filter(p => p.id !== id));
  }

  function prevMonth() {
    if (calendarMonth === 0) {
      setCalendarYear(y => y - 1);
      setCalendarMonth(11);
    } else {
      setCalendarMonth(m => m - 1);
    }
  }

  function nextMonth() {
    if (calendarMonth === 11) {
      setCalendarYear(y => y + 1);
      setCalendarMonth(0);
    } else {
      setCalendarMonth(m => m + 1);
    }
  }

  return (
    <div className={cx(pageStyle)}>
      <main className={cx(mainStyle)}>
        {/* ─── Left: Configuration ─── */}
        <aside className={cx(asideStyle)}>
          <div>
            <H2 style={{ margin: '0 0 6px', color: palette.gray.dark4, fontSize: 20 }}>
              Configure Schedule
            </H2>
            <Body style={{ margin: 0, color: palette.gray.dark1, fontSize: 13 }}>
              Choose a maintenance day and wave for each project. You can add up to 5 projects to
              see how their schedules land on the calendar.
            </Body>
          </div>

          {/* MongoDB Maintenance Release Date */}
          <div className={cx(releaseCardStyle)}>
            <span className={cx(releaseTitleStyle)}>MongoDB Maintenance Release Date</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <div className={cx(releaseLabelStyle)}>
                  Release Date
                  <span
                    style={{ fontSize: 11, fontWeight: 400, color: palette.gray.dark1, marginLeft: 6 }}
                  >
                    (1st–7th of the month)
                  </span>
                </div>
                <DateSelectPicker value={releaseDateStr} onChange={setReleaseDateStr} />
              </div>
              <Select
                label="Release Time"
                placeholder="Select a time"
                value={releaseTimeStr}
                onChange={v => setReleaseTimeStr(v)}
                size="small"
              >
                {TIME_OPTIONS_30MIN.map(opt => (
                  <Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onChange={updateProject}
              onRemove={() => removeProject(project.id)}
            />
          ))}

          {projects.length < MAX_PROJECTS ? (
            <Button variant="default" onClick={addProject}>
              Add another project
            </Button>
          ) : (
            <Body
              style={{ margin: 0, fontSize: 11, color: palette.gray.dark1, textAlign: 'center' }}
            >
              Maximum number of projects reached
            </Body>
          )}
        </aside>

        {/* ─── Right: Calendar ─── */}
        <section className={cx(sectionContentStyle)}>
          <div>
            <H2 style={{ margin: '0 0 6px', color: palette.gray.dark4, fontSize: 20 }}>
              Projected Maintenance Calendar
            </H2>
            <Body style={{ margin: 0, color: palette.gray.dark1, fontSize: 13 }}>
              Each wave must be at least 48 hours after the MongoDB update and at least 48 hours
              after the previous wave. If the day you&apos;ve chosen falls within that window, it
              will automatically shift to the next valid occurrence.
            </Body>
          </div>

          <Banner variant="info">
            This is an interactive simulation for planning purposes only. Actual maintenance dates
            depend on your Atlas configuration. Always verify in the Atlas UI before scheduling.
          </Banner>

          <div className={cx(calendarCardStyle)}>
            <CalendarPanel
              releaseDate={releaseDate}
              entries={entries}
              year={calendarYear}
              month={calendarMonth}
              onPrev={prevMonth}
              onNext={nextMonth}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
