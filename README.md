# Contact+ 2026 Astro Site

This is the active static website implementation for Contact+ 2026.

## Commands

Use the bundled commands in Codex:

```bash
pnpm run dev:bundled
pnpm run audit:content:bundled
pnpm run build:bundled
pnpm run preview:bundled
```

The non-bundled commands are available for local environments where `node` is already on PATH.

## Source Of Truth

- Events and schedule data: `src/content/events/`
- People, artists, teachers and companies: `src/content/people/`
- Content schema: `src/content/config.ts`
- Program logic: `src/lib/program.ts`
- Routes: `src/pages/`
- Components: `src/components/`

Historical manifests and old HTML versions in the parent workspace are reference material only. Check the Astro content collections and code before relying on old project notes.
