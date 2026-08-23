import { defineCollection, z } from 'astro:content';

const localizedText = z.object({
  en: z.string(),
  ro: z.string(),
  ru: z.string(),
});

const localizationStatus = z.object({
  en: z.enum(['missing', 'draft', 'native_edit_needed', 'ready_for_review', 'approved']).optional(),
  ro: z.enum(['missing', 'draft', 'native_edit_needed', 'ready_for_review', 'approved']).optional(),
  ru: z.enum(['missing', 'draft', 'native_edit_needed', 'ready_for_review', 'approved']).optional(),
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    visibility: z.enum(['public_page', 'schedule_only', 'internal_only']),
    publishing_status: z.enum(['draft', 'working', 'ready_for_review', 'approved', 'archived']),
    program_line: z.enum([
      'ci',
      'ci_jam',
      'ci_performance',
      'family_youth',
      'film_presentation',
      'jam',
      'meal',
      'performance',
      'performance_lab',
      'gathering',
      'theatre_performance',
    ]),
    filters: z.array(z.string()).optional(),
    title: localizedText,
    meta: z.object({
      category: localizedText.optional(),
      format: localizedText.optional(),
    }).optional(),
    schedule: z.object({
      date_display: z.string(),
      time_display: z.string(),
      sort_start: z.string().optional(),
    }),
    occurrences: z.array(z.object({
      date: z.string(),
      date_label: z.string(),
      time_display: z.string(),
      sort_start: z.string().optional(),
      location_ref: z.string().optional(),
    })).optional(),
    location_ref: z.string().optional(),
    people_label: z.string().optional(),
    people: z.array(z.object({
      person_id: z.string(),
      display_role: z.string(),
      public_label: localizedText.optional(),
      public_visibility: z.enum(['visible', 'hidden', 'credits_only']),
    })).optional(),
    summary: localizedText,
    full_body: localizedText.optional(),
    focus_label: localizedText.optional(),
    focus: localizedText.optional(),
    body: localizedText,
    credits: z.object({
      short: localizedText.optional(),
      full_source: localizedText.optional(),
      items: z.array(z.object({
        label: localizedText,
        value: localizedText,
      })).optional(),
    }).optional(),
    related: z.object({
      events: z.array(z.string()).optional(),
      people: z.array(z.string()).optional(),
    }).optional(),
    source_confidence: z.enum(['working', 'confirmed', 'needs_artist_confirmation']).optional(),
    localization_status: localizationStatus.optional(),
  }).passthrough(),
});

const people = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string().optional(),
    entity_type: z.enum(['person', 'company', 'collective']),
    public_listing: z.boolean().default(true),
    participation_status: z.enum([
      'attending_teacher',
      'attending_artist',
      'attending_teacher_artist',
      'attending_company',
      'production_company',
      'credit_only_not_attending',
      'internal_only',
    ]),
    name: z.string(),
    country_display: z.string().optional(),
    role_summary: localizedText,
    short_profile: localizedText,
    extended_profile: localizedText.optional(),
    festival_events: z.array(z.object({
      event_id: z.string(),
      relation: z.enum(['teacher', 'facilitator', 'artist', 'performer', 'company', 'production', 'discussion', 'credit_only']),
    })).optional(),
    credits_note: localizedText.optional(),
    source_confidence: z.enum(['working', 'confirmed', 'needs_confirmation']).optional(),
    localization_status: localizationStatus.optional(),
  }).passthrough(),
});

export const collections = { events, people };
