# AGENTS.md — AI Agent Instructions for EasyShoppingMall Landing Page

## 1. Project Overview

- **Framework:** Next.js 16 (App Router)
- **Language:** JavaScript (Strictly no TypeScript)
- **Styling:** Tailwind CSS v4 (Utility-first, zero inline styles)
- **Database:** MongoDB with Mongoose v9 (Singleton connection pattern)
- **Auth:** NextAuth v4 (The only authorized API route)
- **State Management:** Zustand v5 with Context Providers (to prevent
  SSR/Hydration mismatches)
- **Forms & Validation:** react-hook-form + zod v4 + @hookform/resolvers
- **UI Icons:** lucide-react
- **Utilities:** clsx, tailwind-merge (via the `cn` helper in `src/utils/cn.js`)
- **Path alias:** `@/*` maps to `src/*`

---

## 2. Directory Architecture (Feature-Driven / Screaming Architecture)

To maximize maintainability and isolation, the project uses a feature-driven
layout. All domain-specific components, actions, stores, and validations must
live inside their respective folder under `src/features/`.

```
src/
  components/           # Global, highly-reusable UI elements (atoms/molecules)
    ui/                 # Buttons, inputs, data-table, dialogs
  features/             # Domain-driven feature modules
    home/               # Home / Landing page module
      components/       # Feature-specific components
        hero-banner.jsx
        sale-countdown.jsx
    dashboard/          # Dashboard module
    products/           # Product domain module
      actions/          # Server Actions specific to products
        product.js
      components/
        product-card.jsx
      store/
        product-store.jsx
        product-store-provider.jsx
      validations/
        product-schema.js
    orders/             # Order domain module
    reviews/            # Review domain module
  models/               # Global Mongoose Models (Data layer encapsulation)
    Product.js
    Order.js
    Review.js
  config/               # Application configuration & env validation
    db.js               # Database connection singleton
    auth.js             # NextAuth configuration
    env-server.js       # Server env schema and execution check
    env-client.js       # Client env schema
  utils/                # Global stateless helper functions
    cn.js               # Tailwind merge helper
app/
  api/auth/             # ONLY allowed API route (NextAuth Catch-all)
  dashboard/            # Dynamic dashboard pages
  login/                # Static login page
  page.jsx              # Landing page route
```

---

## 3. Rendering & Performance Strategies

| Route         | Strategy        | Architectural Implementation Notes                |
| :------------ | :-------------- | :------------------------------------------------ |
| `/` (Landing) | Prerender (SSG) | Static shell, instant delivery.                   |
| Product Feeds | ISR             | Export `revalidate` on targeted components/pages. |
| `/dashboard`  | Dynamic (SSR)   | Force dynamic rendering; absolute zero cache.     |
| `/login`      | Prerender (SSG) | Purely static asset.                              |

---

## 4. Routing & Data Mutations

- **Zero Custom API Routes:** Custom endpoints (`app/api/*`) are strictly
  forbidden except for the NextAuth handler.
- **Data Flow:** All reads and writes must go through **Server Actions** located
  within `src/features/[feature]/actions/`.
- **Dynamic Contexts:** Dashboard layouts and pages must read server state
  natively via Server Actions or direct model calls—never use
  `generateStaticParams` or static caching here.

---

## 5. Component & UI Architecture

- **Granular Decomposition:** Break UI down into isolated, single-responsibility
  components. One file equals one component.
- **Styling Discipline:** Tailwind CSS v4 utility classes only. No inline
  styles.
- **Class Merging:** Dynamically apply classes strictly using the `cn(...)`
  utility.

---

## 6. State Management Stategy (Zustand + Providers)

To safe-guard against Next.js SSR hydration bugs and ensure isolation between
concurrent user requests, follow this pattern explicitly:

- Create the store with a hook creator
  (`src/features/[feature]/store/[store-name].jsx`).
- Wrap the store instance inside a React Context Provider
  (`src/features/[feature]/store/[store-name]-provider.jsx`).
- Consumer tree segments must be wrapped by the respective provider.

---

## 7. Configuration & Environment Security

- **Strict Validation:** Env variables must be validated on system bootstrap
  using Zod.
- **Client Sanitization:** Only expose variables starting with `NEXT_PUBLIC_`
  inside `src/config/env-client.js`.
- **Leak Prevention:** Server-side secrets live exclusively in
  `src/config/env-server.js`. **Never** parse `process.env` directly within
  runtime components.

---

## 8. Security & Guardrails

- **Authorization First:** Every Server Action must explicitly authenticate and
  authorize the session before executing business logic or hitting the database.
- **Input Sanitization:** Parse all incoming user payloads against their
  respective Zod schemas.
- **XSS Mitigation:** Avoid raw `dangerouslySetInnerHTML` injections.

---

## 9. File Naming Conventions (Strictly Enforced)

To maintain a clean and uniform codebase, adhere exactly to the following naming
conventions:

- **Files / Paths:** Kebab-case (`lower-case-with-hyphens`) across all folders,
  components, stores, and utilities.
- **Components:** Filename is kebab-case (e.g., `navbar.jsx`), internal
  declaration is PascalCase:
  ```javascript
  export const Navbar = () => { ... }
  ```
- **Zustand Stores:** Filename is kebab-case (e.g., `order-store.jsx`), internal
  declaration uses the `use` prefix hook pattern:
  ```javascript
  export const useOrderStore = create(...)
  ```
- **Store Providers:** Filename is kebab-case appended with `-provider` (e.g.,
  `order-store-provider.jsx`), internal declaration is PascalCase:
  ```javascript
  export const OrderStoreProvider = ({ children }) => { ... }
  ```
- **Mongoose Models:** Exception to the rule. Models maintain PascalCase to map
  cleanly as Class constructors (e.g., `src/models/Product.js`).

---

## 10. Code Quality Assurance

- Keep Server Actions highly focused. Offload structural data processing to the
  data layer/models.
- Ensure all hooks and structural utility changes pass clean diagnostics by
  running `npm run lint` prior to final staging.
