import { createRequire } from 'node:module';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const yaml = require(findJsYaml());
const locales = ['en', 'ro', 'ru'];
const problems = [];

function findJsYaml() {
  const direct = join(root, 'node_modules/js-yaml');
  if (existsSync(direct)) return direct;

  const pnpmRoot = join(root, 'node_modules/.pnpm');
  const match = readdirSync(pnpmRoot).find((entry) => entry.startsWith('js-yaml@'));
  if (!match) {
    throw new Error('Cannot find js-yaml. Run pnpm install before content audit.');
  }

  return join(pnpmRoot, match, 'node_modules/js-yaml');
}

function readCollection(collection) {
  const dir = join(root, 'src/content', collection);
  return readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const fullPath = join(dir, file);
      const raw = readFileSync(fullPath, 'utf8');
      const frontmatter = raw.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatter) {
        add('error', collection, file, 'Missing frontmatter.');
        return { file, id: file.replace(/\.md$/, ''), data: {} };
      }

      return {
        file,
        id: file.replace(/\.md$/, ''),
        data: yaml.load(frontmatter[1]) || {},
      };
    });
}

function add(level, collection, file, message) {
  problems.push({ level, collection, file, message });
}

function localizedValue(value, locale) {
  return typeof value === 'object' && value ? value[locale] : undefined;
}

function normalized(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[.,;:()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasLocalized(collection, file, data, field) {
  const value = data[field];
  for (const locale of locales) {
    if (!localizedValue(value, locale)) {
      add('error', collection, file, `Missing ${field}.${locale}.`);
    }
  }
}

const events = readCollection('events');
const people = readCollection('people');
const eventsById = new Map(events.map((event) => [event.id, event]));
const peopleById = new Map(people.map((person) => [person.data.id || person.id, person]));

for (const event of events) {
  const { data, file } = event;

  if ('slug' in data) {
    add('error', 'events', file, 'Remove slug from frontmatter; Astro uses the filename as the route slug.');
  }

  if (data.visibility === 'public_page') {
    for (const field of ['title', 'summary', 'body']) {
      hasLocalized('events', file, data, field);
    }

    if (!data.schedule?.date_display || !data.schedule?.time_display) {
      add('error', 'events', file, 'Public event needs schedule.date_display and schedule.time_display.');
    }
  }

  for (const personRef of data.people || []) {
    const linkedPerson = peopleById.get(personRef.person_id);
    if (!linkedPerson) {
      add('error', 'events', file, `people.person_id "${personRef.person_id}" does not exist in people collection.`);
      continue;
    }

    if (personRef.public_visibility === 'visible') {
      if (linkedPerson.data.participation_status === 'credit_only_not_attending') {
        add('error', 'events', file, `credit-only person "${personRef.person_id}" cannot be public_visibility: visible.`);
      }

      if (linkedPerson.data.public_listing !== true) {
        add('error', 'events', file, `visible person "${personRef.person_id}" must have public_listing: true.`);
      }
    }
  }

  for (const eventRef of data.related?.events || []) {
    const linkedEvent = eventsById.get(eventRef);
    if (!linkedEvent) {
      add('error', 'events', file, `related.events "${eventRef}" does not exist in events collection.`);
      continue;
    }

    if (linkedEvent.data.visibility !== 'public_page') {
      add('error', 'events', file, `related.events "${eventRef}" is not public_page. Do not create public links to schedule_only/internal events.`);
    }
  }

  for (const personRef of data.related?.people || []) {
    if (!peopleById.has(personRef)) {
      add('error', 'events', file, `related.people "${personRef}" does not exist in people collection.`);
    }
  }

  for (const locale of locales) {
    const category = normalized(localizedValue(data.meta?.category, locale));
    const format = normalized(localizedValue(data.meta?.format, locale));
    const categoryNamesPerformance = ['performance', 'performativ', 'перформанс'].some((word) => category.includes(word));
    const formatOnlyRepeatsPerformance = ['performance', 'перформанс'].includes(format);

    if (categoryNamesPerformance && formatOnlyRepeatsPerformance) {
      add('error', 'events', file, `meta.format.${locale} repeats performance already named in category. Use a specific format or omit format.`);
    }
  }

  const credits = data.credits;
  if (credits?.short && !credits.items?.length && !credits.full_source) {
    add('error', 'events', file, 'credits.short without credits.items/full_source usually duplicates UI. Keep Credits only for real source/production credits.');
  }

  const visiblePeople = (data.people || []).filter((person) => person.public_visibility === 'visible');
  for (const locale of locales) {
    const shortCredit = normalized(localizedValue(credits?.short, locale));
    if (!shortCredit) continue;

    for (const person of visiblePeople) {
      const profile = peopleById.get(person.person_id);
      const name = normalized(profile?.data.name || person.person_id);
      if (name && shortCredit.includes(name)) {
        add('error', 'events', file, `credits.short.${locale} repeats visible participant "${profile?.data.name || person.person_id}". Use the With/By block instead.`);
      }
    }
  }
}

for (const person of people) {
  const { data, file } = person;

  if ('slug' in data) {
    add('error', 'people', file, 'Remove slug from frontmatter; Astro uses the filename as the route slug.');
  }

  if (data.participation_status === 'credit_only_not_attending' && data.public_listing === true) {
    add('error', 'people', file, 'credit_only_not_attending people must not be public_listing: true.');
  }

  if (data.public_listing === true) {
    hasLocalized('people', file, data, 'role_summary');
    hasLocalized('people', file, data, 'short_profile');
  }

  for (const eventRef of data.festival_events || []) {
    const linkedEvent = eventsById.get(eventRef.event_id);
    if (!linkedEvent) {
      add('error', 'people', file, `festival_events.event_id "${eventRef.event_id}" does not exist in events collection.`);
      continue;
    }

    if (eventRef.relation !== 'credit_only' && linkedEvent.data.visibility !== 'public_page') {
      add('error', 'people', file, `festival event "${eventRef.event_id}" is ${linkedEvent.data.visibility}; non-credit public relations should point to public_page events.`);
    }
  }

  for (const locale of locales) {
    const role = normalized(localizedValue(data.role_summary, locale));
    if (role.includes(' credit') || role.includes('credits') || role.includes('credit ')) {
      add('error', 'people', file, `role_summary.${locale} contains credit/source context. Keep public role and credits separate.`);
    }
  }
}

if (problems.length === 0) {
  console.log('Content audit passed.');
  process.exit(0);
}

for (const problem of problems) {
  console.log(`${problem.level.toUpperCase()} ${problem.collection}/${problem.file}: ${problem.message}`);
}

const hasErrors = problems.some((problem) => problem.level === 'error');
process.exit(hasErrors ? 1 : 0);
