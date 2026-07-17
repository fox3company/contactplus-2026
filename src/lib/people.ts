import { getLocalized, type Locale } from './locales';

type PersonLike = {
  data: {
    entity_type: string;
    participation_status: string;
    festival_events?: { relation: string }[];
  };
};

export function getFestivalRoleLabel(person: PersonLike, lang: Locale) {
  const status = person.data.participation_status;
  const relations = new Set((person.data.festival_events || []).map((event) => event.relation));

  if (status === 'production_company') {
    return getLocalized({
      en: 'Production company',
      ro: 'Companie de producție',
      ru: 'Продакшн-компания',
    }, lang);
  }

  if (person.data.entity_type !== 'person') {
    return getLocalized({
      en: 'Dance company',
      ro: 'Companie de dans',
      ru: 'Танцевальная компания',
    }, lang);
  }

  if (status === 'attending_teacher_artist') {
    return getLocalized({
      en: 'Teacher / Performer',
      ro: 'Profesor / performer',
      ru: 'Преподаватель / перформер',
    }, lang);
  }

  if (status === 'attending_teacher') {
    if (relations.has('facilitator') && relations.has('teacher')) {
      return getLocalized({
        en: 'Teacher / Facilitator',
        ro: 'Profesor / facilitator',
        ru: 'Преподаватель / фасилитатор',
      }, lang);
    }

    if (relations.has('facilitator')) {
      return getLocalized({
        en: 'Facilitator',
        ro: 'Facilitator',
        ru: 'Фасилитатор',
      }, lang);
    }

    return getLocalized({
      en: 'Teacher',
      ro: 'Profesor',
      ru: 'Преподаватель',
    }, lang);
  }

  if (status === 'attending_artist') {
    if (relations.has('discussion')) {
      return getLocalized({
        en: 'Artist / Discussion guest',
        ro: 'Artist / invitat la discuție',
        ru: 'Артист / участник дискуссии',
      }, lang);
    }

    return getLocalized({
      en: 'Performer / Artist',
      ro: 'Performer / artist',
      ru: 'Перформер / артист',
    }, lang);
  }

  return getLocalized({
    en: 'Source credit',
    ro: 'Credit sursă',
    ru: 'Source credit',
  }, lang);
}

export function getFestivalRelationSummary(relations: string[], lang: Locale) {
  const relationSet = new Set(relations);
  const labels = [
    relationSet.has('teacher') && getLocalized({ en: 'teaching', ro: 'predare', ru: 'преподавание' }, lang),
    relationSet.has('facilitator') && getLocalized({ en: 'facilitating', ro: 'facilitare', ru: 'фасилитация' }, lang),
    (relationSet.has('performer') || relationSet.has('artist')) && getLocalized({ en: 'performing', ro: 'performance', ru: 'перформанс' }, lang),
    relationSet.has('discussion') && getLocalized({ en: 'discussion', ro: 'discuție', ru: 'дискуссия' }, lang),
    relationSet.has('company') && getLocalized({ en: 'company work', ro: 'companie', ru: 'компания' }, lang),
    relationSet.has('production') && getLocalized({ en: 'production', ro: 'producție', ru: 'продакшн' }, lang),
  ].filter(Boolean);

  return labels.join(' / ');
}
