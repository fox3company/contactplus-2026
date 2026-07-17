import type { CollectionEntry } from 'astro:content';

export type ProgramEvent = CollectionEntry<'events'>;

export interface ProgramOccurrence {
  event: ProgramEvent;
  date: string;
  dateLabel: string;
  timeDisplay: string;
  sortStart?: string;
  locationRef?: string;
}

export type ProgramViewMode = 'full_festival' | 'classes_performances';

export type ProgramFilterGroup =
  | 'all'
  | 'ci'
  | 'performance_labs'
  | 'performances'
  | 'family_youth'
  | 'jams_gatherings'
  | 'breaks'
  | 'org';

const classesPerformancesLines = new Set([
  'ci',
  'ci_jam',
  'ci_performance',
  'family_youth',
  'film_presentation',
  'performance',
  'performance_lab',
  'theatre_performance',
]);

const publicScheduleVisibility = new Set(['public_page', 'schedule_only']);

export const programViewModes: ProgramViewMode[] = ['full_festival', 'classes_performances'];

export const programFilterGroups: ProgramFilterGroup[] = [
  'all',
  'ci',
  'performance_labs',
  'performances',
  'family_youth',
  'jams_gatherings',
  'breaks',
  'org',
];

export function isPublicScheduleEvent(event: ProgramEvent): boolean {
  return publicScheduleVisibility.has(event.data.visibility);
}

export function isPublicDetailEvent(event: ProgramEvent): boolean {
  return event.data.visibility === 'public_page';
}

export function isClickableProgramEvent(event: ProgramEvent): boolean {
  return isPublicDetailEvent(event);
}

export function isVisibleInProgramView(event: ProgramEvent, viewMode: ProgramViewMode): boolean {
  if (!isPublicScheduleEvent(event)) return false;
  if (viewMode === 'full_festival') return true;

  return classesPerformancesLines.has(event.data.program_line);
}

export function getProgramFilterGroup(event: ProgramEvent): Exclude<ProgramFilterGroup, 'all'> {
  const filters = new Set(event.data.filters || []);

  if (event.data.program_line === 'meal' || filters.has('meal')) return 'breaks';
  if (event.data.visibility === 'internal_only') return 'org';
  if (event.data.program_line === 'jam' || event.data.program_line === 'ci_jam' || filters.has('jam')) {
    return 'jams_gatherings';
  }
  if (event.data.program_line === 'family_youth' || filters.has('family') || filters.has('youth')) {
    return 'family_youth';
  }
  if (
    event.data.program_line === 'performance_lab' ||
    event.data.program_line === 'ci_performance'
  ) {
    return 'performance_labs';
  }
  if (
    event.data.program_line === 'performance' ||
    event.data.program_line === 'theatre_performance' ||
    event.data.program_line === 'film_presentation' ||
    filters.has('performance')
  ) {
    return 'performances';
  }
  if (event.data.program_line === 'gathering') {
    return 'jams_gatherings';
  }

  return 'ci';
}

export function getProgramCategoryLabel(category: string | undefined, programLine: string): string {
  const value = category || programLine;
  const normalized = value.toLowerCase().replace(/[_-]/g, ' ');

  if (normalized === 'gathering') return 'Gathering';

  return value;
}

export function isVisibleForProgramFilter(event: ProgramEvent, filterGroup: ProgramFilterGroup): boolean {
  if (filterGroup === 'all') return true;
  return getProgramFilterGroup(event) === filterGroup;
}

export function filterProgramEvents(
  events: ProgramEvent[],
  options: {
    viewMode?: ProgramViewMode;
    filterGroup?: ProgramFilterGroup;
    includeScheduleOnly?: boolean;
  } = {},
): ProgramEvent[] {
  const {
    viewMode = 'full_festival',
    filterGroup = 'all',
    includeScheduleOnly = true,
  } = options;

  return events
    .filter((event) => (includeScheduleOnly ? isPublicScheduleEvent(event) : isPublicDetailEvent(event)))
    .filter((event) => isVisibleInProgramView(event, viewMode))
    .filter((event) => isVisibleForProgramFilter(event, filterGroup))
    .sort(compareProgramEvents);
}

export function getProgramOccurrences(events: ProgramEvent[]): ProgramOccurrence[] {
  return events
    .flatMap((event) => {
      const occurrences = event.data.occurrences?.length
        ? event.data.occurrences
        : [{
          date: '',
          date_label: event.data.schedule.date_display,
          time_display: event.data.schedule.time_display,
          sort_start: event.data.schedule.sort_start,
          location_ref: event.data.location_ref,
        }];

      return occurrences.map((occurrence) => ({
        event,
        date: occurrence.date,
        dateLabel: occurrence.date_label,
        timeDisplay: occurrence.time_display,
        sortStart: occurrence.sort_start,
        locationRef: occurrence.location_ref || event.data.location_ref,
      }));
    })
    .sort(compareProgramOccurrences);
}

export function groupProgramEventsByDay(events: ProgramEvent[]): { day: string; occurrences: ProgramOccurrence[] }[] {
  const groups = new Map<string, ProgramOccurrence[]>();

  for (const occurrence of getProgramOccurrences(events)) {
    const day = occurrence.dateLabel;
    groups.set(day, [...(groups.get(day) || []), occurrence]);
  }

  return [...groups.entries()].map(([day, occurrences]) => ({
    day,
    occurrences: occurrences.sort(compareProgramOccurrences),
  }));
}

export function compareProgramEvents(a: ProgramEvent, b: ProgramEvent): number {
  return getSortValue(a) - getSortValue(b) || a.slug.localeCompare(b.slug);
}

function getSortValue(event: ProgramEvent): number {
  const explicitSort = event.data.schedule.sort_start;
  if (explicitSort) return Date.parse(explicitSort);

  return getDateSortValue(event.data.schedule.date_display) + getTimeSortValue(event.data.schedule.time_display);
}

function compareProgramOccurrences(a: ProgramOccurrence, b: ProgramOccurrence): number {
  return getOccurrenceSortValue(a) - getOccurrenceSortValue(b) || a.event.slug.localeCompare(b.event.slug);
}

function getOccurrenceSortValue(occurrence: ProgramOccurrence): number {
  if (occurrence.sortStart) return Date.parse(occurrence.sortStart);

  return getDateSortValue(occurrence.dateLabel) + getTimeSortValue(occurrence.timeDisplay);
}

function getDateSortValue(dateDisplay: string): number {
  const monthMatch = dateDisplay.match(/\b(Sep|Oct)\s+(\d{1,2})\b/i);
  if (!monthMatch) return Number.MAX_SAFE_INTEGER / 2;

  const month = monthMatch[1].toLowerCase() === 'sep' ? 8 : 9;
  const day = Number(monthMatch[2]);
  return Date.UTC(2026, month, day);
}

function getTimeSortValue(timeDisplay: string): number {
  const timeMatch = timeDisplay.match(/\b(\d{1,2}):(\d{2})\b/);
  if (!timeMatch) return 23 * 60 * 60 * 1000;

  const hours = Number(timeMatch[1]);
  const minutes = Number(timeMatch[2]);
  return (hours * 60 + minutes) * 60 * 1000;
}
