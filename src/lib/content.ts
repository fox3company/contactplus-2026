import type { CollectionEntry } from 'astro:content';

export function isPublicEvent(event: CollectionEntry<'events'>): boolean {
  return event.data.visibility === 'public_page';
}

export function isPublicPerson(person: CollectionEntry<'people'>): boolean {
  return (
    person.data.public_listing === true &&
    person.data.participation_status !== 'credit_only_not_attending' &&
    person.data.participation_status !== 'internal_only'
  );
}

export function isPublicCompany(person: CollectionEntry<'people'>): boolean {
  return (
    person.data.public_listing === true &&
    ['company', 'collective'].includes(person.data.entity_type)
  );
}
