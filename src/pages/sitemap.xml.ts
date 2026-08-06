import { getCollection } from 'astro:content';
import { isPublicPerson } from '../lib/content';
import { locales } from '../lib/locales';

const site = 'https://contactplus-2026.pages.dev';

function url(path: string) {
  return `<url><loc>${site}${path}</loc></url>`;
}

export async function GET() {
  const events = await getCollection('events', ({ data }) => data.visibility === 'public_page');
  const people = await getCollection('people', isPublicPerson);
  const staticPages = ['about', 'program', 'schedule', 'passes', 'artists'];

  const urls = [
    url('/'),
    ...locales.flatMap((lang) => staticPages.map((page) => url(`/${lang}/${page}/`))),
    ...locales.map((lang) => url(`/${lang}/schedule/horizontal/`)),
    ...locales.flatMap((lang) => events.map((event) => url(`/${lang}/program/${event.slug}/`))),
    ...locales.flatMap((lang) => people.map((person) => url(`/${lang}/artists/${person.slug}/`))),
  ];

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    },
  );
}
