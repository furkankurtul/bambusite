# Project development rules

## Purpose and priorities

Build a modern 3D printing product catalog website. The interactive 3D product
viewer is a core feature. Prioritize, in order:

1. Correctness
2. Maintainable architecture
3. Working 3D functionality
4. Responsive design
5. Performance
6. Accessibility
7. Visual quality

## General development

- Inspect existing architecture before changing it. Modify working systems rather
  than rewriting them without reason.
- Use TypeScript; avoid `any`. Keep strict type checking and unused-code checks.
- Prefer reusable, focused components; avoid giant page components and duplicated logic.
- Centralize site configuration in `src/config/site.ts`.
- Prefer Server Components. Add Client Components only for browser APIs, state,
  events, or other features that require them.
- Avoid unnecessary dependencies. Use npm and keep `package-lock.json` current.
- Use the `@/*` alias for imports from `src`.
- Use Prettier for consistent formatting.
- Implement only the requested scope. The foundation does not authorize building
  product pages, forms, ecommerce, a CMS, a database, or authentication.

## Product architecture

Product UI must not import a local product data file directly. Introduce a
repository in `src/lib` when product work begins, with functions such as
`getProducts()`, `getProductBySlug()`, `getFeaturedProducts()`, and
`getProductsByCategory()`. Keep shared domain types in `src/types` and any initial
local data in `src/data`. This boundary must allow migration to a CMS or database
without rewriting product UI. Do not introduce fake data or unused repository
implementations during foundation work.

## 3D viewer

Use React Three Fiber, Three.js, and drei. The development cube under
`src/app/dev/three` is disposable verification code, not the ModelViewer architecture.

- Load STL models asynchronously, only on product detail pages.
- Center geometry automatically and use bounding boxes for framing.
- Adapt camera distance to model size.
- Support mouse and touch rotation/zoom with OrbitControls.
- Color changes update materials only; never reload STL geometry for a color change.
- Listing pages use thumbnails and must never preload STL models.
- Dispose geometries, materials, textures, and controls correctly. Respect shared
  cache ownership so disposing one instance does not break another.
- Isolate viewer errors with a fallback so they do not crash the whole page.
- STL does not reliably contain units. Assume millimeters unless a model is
  explicitly configured otherwise.

## Performance and accessibility

Lazy-load expensive 3D code when appropriate. Avoid unnecessary Canvas re-renders,
optimize images, and minimize client JavaScript. Use semantic HTML, keyboard
accessibility, visible focus states, useful alternative text, and readable contrast.
Provide an accessible alternative to essential information displayed only in 3D.

## Validation

Before completing tasks, run the available checks and fix failures:

```sh
npm run lint
npm run typecheck
npm run build
npm run format:check
```

When browser tools are available, open the application, test navigation and
interactive features, inspect console errors and failed network requests, and
check desktop, tablet, and mobile layouts. Report any checks that are blocked.

For future 3D pages, verify STL loading, centering, camera framing, rotation, zoom,
touch interaction, color changes, reset controls, missing-STL fallback, failed
loading, and extreme model sizes. Verify color changes do not trigger STL requests.

## Documentation and secrets

Update README whenever architecture or product management changes. Document new
environment settings in `.env.example`. Never commit secrets or local environment
files. Keep the development-only sanity route unavailable in production.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
