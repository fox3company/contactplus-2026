import type { CollectionEntry } from 'astro:content';
import {
  getLocalizedDateLabel,
  getLocalizedDayRangeLabel,
} from './festivalDates';
import {
  getLocalized,
  getLocalizedCountryDisplay,
  type Locale,
} from './locales';
import { locations } from './locations';
import {
  getProgramCategoryLabel,
  getProgramOccurrences,
  isPublicDetailEvent,
  type ProgramEvent,
} from './program';
import { isPublicPerson } from './content';

export interface EventDetailData {
  title: string;
  category: string;
  format: string;
  dateLines: string[];
  time: string;
  place: string;
  placeAddress: string;
  placeHref: string;
  places: {
    dateLabel: string;
    localizedDateLabel: string;
    name: string;
    address: string;
    href: string;
  }[];
  people: {
    label: string;
    name: string;
    country: string;
    href: string;
  }[];
  description: string;
  focusLabel: string;
  focus: string;
  fullPageHref: string;
}

export type EventDetailMap = Record<string, EventDetailData>;

export function buildEventDetails(
  events: ProgramEvent[],
  people: CollectionEntry<'people'>[],
  lang: Locale,
): EventDetailMap {
  const peopleById = new Map(people.map((person) => [person.data.id || person.slug, person]));
  const withLabel = getLocalized({ en: 'With', ro: 'Cu', ru: 'С кем' }, lang);
  const byLabel = getLocalized({ en: 'By', ro: 'De', ru: 'От' }, lang);

  function formatPersonName(personId: string) {
    return peopleById.get(personId)?.data.name
      || personId.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
  }

  function getPersonLabel(
    person: { public_label?: Partial<Record<Locale, string>> },
    eventPeopleLabel?: string,
  ) {
    return getLocalized(person.public_label, lang)
      || (eventPeopleLabel === 'By' ? byLabel : withLabel);
  }

  function getEventDateLines(event: ProgramEvent) {
    return event.data.schedule.date_display
      .split(/,\s*(?=[A-Z][a-z]{2}\s+\d)/)
      .filter(Boolean)
      .map((dateLabel) => getLocalizedDayRangeLabel(dateLabel, lang));
  }

  function getOccurrenceLocationFacts(event: ProgramEvent) {
    const grouped = new Map<string, {
      dateLabels: string[];
      name: string;
      address: string;
      href: string;
    }>();

    getProgramOccurrences([event]).forEach((occurrence) => {
      const locationRef = occurrence.locationRef || event.data.location_ref;
      if (!locationRef) return;
      const location = locations[locationRef];
      const fact = grouped.get(locationRef) || {
        dateLabels: [],
        name: location?.name || locationRef,
        address: location?.address || '',
        href: location?.href || '',
      };

      if (occurrence.dateLabel && !fact.dateLabels.includes(occurrence.dateLabel)) {
        fact.dateLabels.push(occurrence.dateLabel);
      }

      grouped.set(locationRef, fact);
    });

    return [...grouped.values()].map((fact) => {
      const dateLabel = fact.dateLabels.join(' — ');
      return {
        ...fact,
        dateLabel,
        localizedDateLabel: getLocalizedDateLabel(dateLabel, lang),
      };
    });
  }

  return Object.fromEntries(events.map((event) => {
    const visiblePeople = (event.data.people || [])
      .filter((person) => person.public_visibility === 'visible');
    const eventPeople = visiblePeople.map((person) => {
      const profile = peopleById.get(person.person_id);
      return {
        label: getPersonLabel(person, event.data.people_label),
        name: formatPersonName(person.person_id),
        country: getLocalizedCountryDisplay(profile?.data.country_display, lang),
        href: profile && isPublicPerson(profile) ? `/${lang}/artists/${profile.slug}` : '',
      };
    });
    const category = getProgramCategoryLabel(
      getLocalized(event.data.meta?.category, lang),
      event.data.program_line,
    );
    const format = getLocalized(event.data.meta?.format, lang);
    const places = getOccurrenceLocationFacts(event);
    const firstPlace = places[0];

    return [
      event.slug,
      {
        title: getLocalized(event.data.title, lang),
        category: category || event.data.program_line,
        format,
        dateLines: getEventDateLines(event),
        time: event.data.schedule.time_display,
        place: firstPlace?.name || event.data.location_ref || '',
        placeAddress: firstPlace?.address || '',
        placeHref: firstPlace?.href || '',
        places,
        people: eventPeople,
        description: getLocalized(event.data.body, lang)
          || getLocalized(event.data.summary, lang),
        focusLabel: getLocalized(event.data.focus_label, lang),
        focus: getLocalized(event.data.focus, lang),
        fullPageHref: isPublicDetailEvent(event)
          ? `/${lang}/program/${event.slug}`
          : '',
      },
    ];
  }));
}
