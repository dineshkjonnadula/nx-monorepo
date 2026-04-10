# Angular Nx Monorepo

A production-ready Angular monorepo with two projects sharing a structured library system.

```
my-workspace/              ← main (Nx workspace root)
├── projects/
│   ├── project-one/       ← Analytics Portal  (port 4200)
│   └── project-two/       ← Admin Console     (port 4300)
├── shared/
│   └── src/
│       ├── index.ts       ← Public API: @my-workspace/shared
│       └── lib/
│           ├── feature-auth/            ← Login, guards, interceptor
│           ├── feature-notifications/   ← Notification bell
│           ├── ui-components/           ← Button, Card, Modal
│           ├── data-access-api/         ← AuthService, NotificationsService
│           ├── models/                  ← Interfaces & types
│           ├── util-helpers/            ← Date, string utilities
│           └── environments/            ← APP_ENVIRONMENT token
├── angular.json
├── nx.json
├── tsconfig.base.json
├── .eslintrc.json
└── package.json
```

---

## Getting started

```bash
npm install

# Serve project-one — http://localhost:4200
npm run start:project-one

# Serve project-two — http://localhost:4300
npm run start:project-two
```

---

## Library layers

```
projects/
shared/src/lib/feature-*       ← smart (injects services, owns logic)
  ├── shared/src/lib/ui-*      ← dumb (inputs/outputs only, no services)
  └── shared/src/lib/data-access-* ← services, HTTP, state
      ├── shared/src/lib/util-*   ← pure functions, no Angular deps
      └── shared/src/lib/models   ← interfaces, types, enums
```

Each layer may only import from layers **below** it. Violations are caught by ESLint at lint time.

---

## Nx commands

```bash
# Serve
nx serve project-one
nx serve project-two

# Build
nx build project-one
nx build project-two
nx affected:build           # only rebuild what changed

# Test
nx test shared
nx affected:test

# Lint (enforces module boundaries)
nx lint project-one
nx affected:lint

# Visualise the dependency graph
nx graph

# Generate a new shared component
nx g @nx/angular:component lib/ui-components/lib/my-widget --project=shared --standalone

# Generate a new shared feature slice (directory-only under shared/src/lib)
nx g @nx/angular:library shared-feature-xyz --directory=shared/src/lib --tags="scope:shared,type:feature"
```

---

## Dependency boundary tags

| Tag | Meaning |
|---|---|
| `scope:project-one` | Belongs to project-one only |
| `scope:project-two` | Belongs to project-two only |
| `scope:shared` | Usable by any project |
| `type:feature` | Smart feature lib (may inject services) |
| `type:ui` | Dumb UI lib (no service injection) |
| `type:data-access` | Services & HTTP |
| `type:util` | Pure helpers, zero Angular deps |
| `type:models` | Interfaces & types only |

---

## Shared Library

Single public import path: `@my-workspace/shared`

Examples exported from this path:

- `LoginComponent`, `authGuard`, `authInterceptor`, `AUTH_ROUTES`
- `NotificationBellComponent`
- `ButtonComponent`, `CardComponent`, `ModalComponent`
- `AuthService`, `NotificationsService`
- `User`, `AuthUser`, `Notification`, `ApiResponse<T>`
- `formatDate`, `timeAgo`, `slugify`, `isValidEmail`
- `AppEnvironment`, `APP_ENVIRONMENT`


---

## Adding Shared Code

```bash
# 1. Create your folder under shared/src/lib (example: shared/src/lib/feature-my-feature)

# 2. Build your components/services in shared/src/lib/feature-my-feature/lib/

# 3. Export from the feature barrel
#    shared/src/lib/feature-my-feature/index.ts

# 4. Re-export from the root shared barrel
#    shared/src/index.ts

# 5. Import anywhere
import { MyThing } from '@my-workspace/shared';
```

## Project-specific features

Code that is unique to one project lives inside that project folder and is never imported by another project. The ESLint boundary rules enforce this automatically and will fail CI if violated.

```
projects/project-one/src/app/feature-dashboard/   ← project-one only
projects/project-one/src/app/feature-reports/     ← project-one only
projects/project-two/src/app/feature-analytics/   ← project-two only
projects/project-two/src/app/feature-settings/    ← project-two only
```
