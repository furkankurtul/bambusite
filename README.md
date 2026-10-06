# 3D Print Catalog

A server-rendered 3D printing product catalog with searchable product listings,
statically generated detail pages, and a lazy-loaded interactive STL viewer. The
current public catalog uses the available Caraxes Dragon and Star Fidget Toy asset
sets; additional local records remain inactive until their assets are supplied.
The project still uses placeholder branding and local sample data; forms,
authentication, a CMS, database, and ecommerce are not implemented.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS, Three.js, React Three Fiber,
@react-three/drei, and lucide-react. ESLint and Prettier provide code checks and
formatting. Exact resolved dependency versions are recorded in `package-lock.json`.

## Local development

Use Node.js 24 (see `.nvmrc`) and npm. Next.js requires Node.js 20.9 or newer.
The initial setup was validated on the available Node.js 26.4.0 / npm 11.17.0.

```sh
nvm use
npm ci
npm run dev
```

Open http://localhost:3000. No environment variables are currently required;
`.env.example` documents this. Add future local values to `.env.local` and never
commit secrets. Values prefixed with `NEXT_PUBLIC_` are public browser data.

| Command                | Purpose                                                          |
| ---------------------- | ---------------------------------------------------------------- |
| `npm run dev`          | Start the development server                                     |
| `npm run build`        | Create the production build                                      |
| `npm start`            | Serve the production build                                       |
| `npm run lint`         | ESLint, with warnings treated as failures                        |
| `npm run typecheck`    | Generate Next.js route types and run TypeScript without emitting |
| `npm run format`       | Apply Prettier formatting                                        |
| `npm run format:check` | Check formatting                                                 |

Run lint, typecheck, build, and format:check before completing changes. Typecheck
also works on a clean checkout before the first build. `npm ci` uses the committed
lockfile for reproducible installs.

## Directory overview

```text
src/
  app/                 App Router layout, styles, and foundation homepage
    dev/products/      Development-only product repository verification
    dev/three/         Isolated development-only cube and error fallback
    products/          Public product catalog route
  components/
    catalog/           Search, category filtering, and catalog empty state
    layout/            Shared header and footer
    product/           Product cards, images, colors, and prices
    three/             Production STL loading, camera fitting, and viewer errors
  config/site.ts       Placeholder identity, contact links, and navigation
  data/products.ts     Local sample data behind the repository boundary
  lib/products/        Async repository, validation, checks, and utilities
  types/product.ts     Product domain types and central allowed values
public/
  models/              Web-delivery STL files
  products/            Product thumbnails and gallery images
assets/models/         Original production STL source files, excluded from export
```

`@/*` maps to `src/*`.

## Architecture

Pages and the root layout default to Server Components. Interactive catalog and
viewer features use narrow client boundaries. The site configuration is the single place for
future name, description, Instagram, WhatsApp, email, and primary navigation.
Contact values are obvious placeholders and are not rendered as live links.
Add navigation entries only as their corresponding routes are implemented.
System fonts avoid external font requests during builds and page rendering.

Future product UI must use repository functions such as `getProducts()`,
`getProductBySlug()`, `getFeaturedProducts()`, and `getProductsByCategory()` from
`src/lib/products`, rather than importing `src/data` directly. This keeps UI
independent from local storage and allows a later CMS/database adapter.

Web-delivery STL files go in `public/models` and are addressed as
`/models/file.stl`. Keep source or production STL files outside `public/`, such
as `assets/models/`, so static deployments contain only optimized viewer assets.
Product listings use images from `public/products` and do not load STL geometry or
the 3D viewer runtime.

## Isolated 3D sanity check

In development, use the homepage link or visit `/dev/three`. It dynamically loads
a blue cube using Canvas, Three.js, and drei OrbitControls. Drag to rotate and
scroll/pinch to zoom. Rendering runs on demand with a capped pixel ratio. R3F owns
and disposes the declarative geometry/material. No STL or external assets are used.
A WebGL fallback and route error boundary handle unavailable rendering.

The route returns 404 in production, and the production homepage has no link to
it. Delete `src/app/dev/three` and its homepage link when this check is no longer
useful; do not promote it into the final viewer without a dedicated design task.

## Product Data Architecture

The product domain lives in `src/types/product.ts`. It defines `Product`, colors,
millimeter dimensions, optional model configuration, and central readonly lists
for categories, materials, and currencies. Derive options from those lists rather
than repeating category or material strings elsewhere.

Eight local records live in `src/data/products.ts`. This file is a local
data adapter, not a UI API. Pages and components must import async functions from
`src/lib/products` and must never import `products.ts` directly. The available API
is:

- `getAllProducts()` for internal access including inactive records
- `getProducts()` and `getActiveProducts()` for the public active catalog
- `getProductBySlug()` and `getProductById()` for active records by default
- `getFeaturedProducts()` and `getProductsByCategory()` for public subsets
- `searchProducts()` for case-insensitive, whitespace-tolerant matching
- `getRelatedProducts()` for deterministic category/tag ranking

Slug/ID uniqueness, URL-safe slugs, categories, colors, image paths, model paths,
materials, currencies, and important required values are validated once when the
repository module loads. Repository arrays are returned as readonly values and
new array instances, so consumers cannot accidentally modify catalog ordering.
The product objects and nested collections are readonly at the type boundary.

To add a product:

1. Add one typed record to `src/data/products.ts` with a unique lowercase
   kebab-case ID and slug.
2. Put image references under `/products/{product-slug}/`, using `cover.webp` for
   the thumbnail and names such as `01.webp` and `02.webp` for additional images.
3. If a model will exist, use `/models/{product-slug}.stl`. Referenced development
   assets may be absent until the UI adds graceful fallbacks; do not commit fake
   binaries.
4. Use `#RGB` or `#RRGGBB` color values. Six-digit values are preferred because
   the viewer can pass them directly to a Three.js material.
5. Set `active: false` to retain a record while hiding it from public repository
   functions. `featured: true` only appears in featured results when the product
   is also active. Omit price/currency for quotation-based products.

STL dimensions are assumed to be millimeters unless `modelConfig` explicitly
specifies otherwise. The current `modelConfig.unit` supports millimeters, along
with optional initial rotation and scale. Automatic camera framing remains the
preferred viewer behavior.

To migrate to Supabase, a CMS, or another database, replace the local data access
inside `src/lib/products` while preserving its async function contracts and domain
types. Product pages and components should require no storage-specific rewrite.

In development, `/dev/products` lists every sample record, repository counts,
featured/search output, and lightweight assertions for validation, search,
related products, and inactive filtering. It returns 404 in production.

## Product Catalog

The public catalog is available at `/products`. Its Server Component loads active
records through `getProducts()` and checks which local public thumbnails exist.
Missing files render a neutral product fallback without sending known-invalid
image requests; the client image component also handles failures after rendering.

`ProductCatalog` is the only interactive catalog boundary. It combines the shared
product search matcher with categories from `PRODUCT_CATEGORIES`, updates `q` and
`category` URL parameters, and renders reusable product cards. Search and category
filters work together, invalid categories safely behave as “All,” and inactive
records never reach the page. Cards link to `/products/[slug]` without loading
STL or Three.js code.

Each active product is statically generated at `/products/[slug]` through
repository-backed `getProductBySlug()` lookups. Unknown and inactive slugs return 404. Detail pages include product metadata, an optional image-selection client
boundary, shared price and dimension formatting, technical details, and related
products selected by `getRelatedProducts()`.

`ProductModelPreview` owns the stable 3D presentation boundary. Products with a
model dynamically load the client-only viewer, while products without one keep
the server-rendered coming-soon state and do not initialize Three.js. The rest of
the detail page remains server rendered.

## 3D Viewer Architecture

`ProductModelPreview` conditionally mounts `InteractiveModelPreview`, which uses
a Next.js dynamic import with server rendering disabled for `ModelViewer`.
`ModelViewer` owns color and camera controls, while `STLModel` owns the loaded
geometry and its single `MeshStandardMaterial`. `STLLoader` reads each active
product's configured path from `public/models`; the separate development-only
sanity route uses a procedural cube for browser verification.

STL files do not encode dependable units, so scene units are treated as
millimeters. Geometry preparation validates the position data, supplies normals
only when absent, centers the raw bounds, applies `modelConfig.initialRotation`
in XYZ order, applies uniform `modelConfig.scale`, and then recomputes its box and
sphere. The material uses flat shading to retain the STL's intended facets. These
calculated bounds drive a padded, FOV-aware camera fit, adaptive clipping planes,
the controls target, and zoom limits after transforms and container resizes.

Choosing a color mutates only the existing material color. It does not remount
the Canvas, reload the STL, or replace geometry. Orbit controls provide damped
rotation and zoom, stop the slow automatic rotation after user input, and expose
reset and restart controls. A scoped `touch-action: pan-y` rule lets vertical
touch gestures scroll the surrounding page while horizontal gestures remain
available to the viewer. Reduced-motion preferences disable automatic rotation
by default.

The stable viewer shell contains loading progress, request and parse failures,
retry controls, WebGL capability handling, context-loss handling, and a
viewer-only error boundary. Geometry and material ownership is explicit and both
are disposed on unmount; React Three Fiber owns renderer and control cleanup.
Model-less products avoid the dynamic viewer import entirely.

Large STL files receive local loading feedback but are not decimated in the
browser. Optimize source meshes before publishing. Very complex or repeatedly
used assets should eventually be converted to an optimized GLB pipeline with
compression and preprocessed normals.

## Codex workflow

Read [AGENTS.md](./AGENTS.md) before changing the project. It defines priorities,
architecture boundaries, 3D requirements, validation, and documentation rules.
Inspect existing code, make scoped changes, run checks, and validate in a browser.
When a browser capability is unavailable, report the limitation explicitly.

## GitHub Pages static hosting

The repository includes a GitHub Actions workflow at
`.github/workflows/deploy-pages.yml`. It builds the Next.js static export and
deploys the generated `out` directory with the repository name as the base path,
so project Pages URLs work without editing application code. The workflow sets
`NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_SITE_URL` from the GitHub repository
context. For local or custom deployments, these optional variables can be set
in `.env.local`; leave them empty when serving the site from `/`.

Enable **Settings → Pages → Source: GitHub Actions** in the repository before
the first deployment. The final brand and contact values in `src/config/site.ts`
may remain placeholders while deployment is being tested.

## Localization

Turkish is the default language at the root routes. English is available under
the equivalent `/en` paths. Typed dictionaries live in `src/i18n`, while
product slugs, category IDs, materials, assets, and STL paths remain shared
between locales. The header language switcher keeps the current page and
preserves catalog query parameters when switching in the browser.

## Future roadmap

1. Add optimized, licensed production assets before activating additional catalog
   records, and add automated visual coverage for representative sizes.
2. Validate physical-device touch behavior, performance budgets, and deployment.

## Tooling notes

Development and builds use Next.js's supported `--webpack` mode because Turbopack's
CSS worker could not bind its local IPC port in this managed environment. Recheck
Turbopack before changing bundlers in a future task.

ESLint 9 is retained for compatibility with Next.js's bundled React, import, and
accessibility plugins. npm marks ESLint 9 deprecated; ESLint 10 currently produces
peer conflicts with those plugins. Upgrade them together when compatible.
npm 11 may also report a pending optional `unrs-resolver` postinstall script;
validation succeeds without enabling it. No install-script policy is weakened.

The current React Three Fiber release internally uses `THREE.Clock`, which emits
a Three.js deprecation warning in the development cube. Rendering and controls
work; do not suppress the warning or patch dependency internals. Revisit it when
upgrading React Three Fiber. Physical-device touch testing remains future work.
