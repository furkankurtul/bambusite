# 3D Print Catalog — Development Foundation

A minimal foundation for a future 3D printing product catalog with an interactive
STL viewer. No final branding, product data, catalog pages, STL loader, forms,
authentication, CMS, database, or ecommerce is implemented.

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
    dev/three/         Isolated development-only cube and error fallback
  components/
    layout/            Future shared layout components
    ui/                Future reusable UI primitives
    product/           Future product UI
    three/             Future production viewer components
    home/              Future homepage sections
  config/site.ts       Placeholder identity, contact links, and navigation
  data/                Future local data behind a repository boundary
  lib/                 Future data access and shared utilities
  types/               Future shared domain types
public/
  models/              Future STL files
  products/            Future product thumbnails/images
  images/              General static imagery
```

Reserved directories contain only `.gitkeep`, so Git preserves the structure.
No placeholder components or unused data APIs are added. `@/*` maps to `src/*`.

## Architecture

Pages and the root layout default to Server Components. Only the isolated 3D
check uses client rendering. The site configuration is the single place for
future name, description, Instagram, WhatsApp, email, and primary navigation.
Contact values are obvious placeholders and are not rendered as live links.
Add navigation entries only as their corresponding routes are implemented.
System fonts avoid external font requests during builds and page rendering.

Future product UI must use repository functions such as `getProducts()`,
`getProductBySlug()`, `getFeaturedProducts()`, and `getProductsByCategory()` from
`src/lib`, rather than importing `src/data` directly. Define the domain model and
repository contract when product development starts, making later CMS/database
migration possible without coupling UI to storage.

Future STL files go in `public/models` and can be addressed as `/models/file.stl`.
**STL units are assumed to be millimeters unless explicitly configured otherwise.**
Product listings use images from `public/products`; they must not load STL geometry.
The future detail viewer must handle asynchronous loading, resource ownership and
disposal, automatic centering/framing, material-only color changes, and errors.

## Isolated 3D sanity check

In development, use the homepage link or visit `/dev/three`. It dynamically loads
a blue cube using Canvas, Three.js, and drei OrbitControls. Drag to rotate and
scroll/pinch to zoom. Rendering runs on demand with a capped pixel ratio. R3F owns
and disposes the declarative geometry/material. No STL or external assets are used.
A WebGL fallback and route error boundary handle unavailable rendering.

The route returns 404 in production, and the production homepage has no link to
it. Delete `src/app/dev/three` and its homepage link when this check is no longer
useful; do not promote it into the final viewer without a dedicated design task.

## Codex workflow

Read [AGENTS.md](./AGENTS.md) before changing the project. It defines priorities,
architecture boundaries, 3D requirements, validation, and documentation rules.
Inspect existing code, make scoped changes, run checks, and validate in a browser.
When a browser capability is unavailable, report the limitation explicitly.

## Future roadmap

1. Define the product domain types and repository contract, including model units,
   thumbnail references, and product identifiers.
2. Implement the catalog with responsive, optimized thumbnails.
3. Build product detail pages and the isolated STL viewer with framing, controls,
   material color updates, loading states, and failure recovery.
4. Add custom print requests, contact, about, and FAQ pages.
5. Validate accessibility, mobile/touch behavior, performance, and deployment.

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
