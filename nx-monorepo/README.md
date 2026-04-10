# Angular Nx Monorepo

A production-ready Angular monorepo with two projects sharing a structured library system.

```
my-workspace/              ← main (Nx workspace root)
├── projects/
│   ├── project-one/       ← Analytics Portal  (port 4200)
│   └── project-two/       ← Admin Console     (port 4300)
├── shared/
│   ├── feature-auth/      ← Login, guards, interceptor
│   ├── feature-notifications/ ← Notification bell
│   ├── ui-components/     ← Button, Card, Modal
│   ├── data-access-api/   ← AuthService, NotificationsService
│   ├── models/            ← Interfaces & types
│   ├── util-helpers/      ← Date, string utilities
│   └── environments/      ← APP_ENVIRONMENT token
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
  └── shared/feature-*        ← smart (injects services, owns logic)
        ├── shared/ui-*       ← dumb (inputs/outputs only, no services)
        └── shared/data-access ← services, HTTP, state
              ├── shared/util  ← pure functions, no Angular deps
              └── shared/models ← interfaces, types, enums
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
nx test shared-feature-auth
nx affected:test

# Lint (enforces module boundaries)
nx lint project-one
nx affected:lint

# Visualise the dependency graph
nx graph

# Generate a new shared component
nx g @nx/angular:component my-widget --project=shared-ui-components --standalone

# Generate a new shared library
nx g @nx/angular:lib shared/feature-xyz --buildable --tags="scope:shared,type:feature"
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

## Shared libraries

| Import path | Contents |
|---|---|
| `@my-workspace/shared/feature-auth` | `LoginComponent`, `authGuard`, `guestGuard`, `authInterceptor`, `AUTH_ROUTES` |
| `@my-workspace/shared/feature-notifications` | `NotificationBellComponent` |
| `@my-workspace/shared/ui-components` | `ButtonComponent`, `CardComponent`, `ModalComponent` |
| `@my-workspace/shared/data-access-api` | `AuthService`, `NotificationsService` |
| `@my-workspace/shared/models` | `User`, `AuthUser`, `Notification`, `ApiResponse<T>` |
| `@my-workspace/shared/util-helpers` | `formatDate`, `timeAgo`, `slugify`, `isValidEmail` … |
| `@my-workspace/shared/environments` | `AppEnvironment`, `APP_ENVIRONMENT` token |

---

## Adding a new shared library

```bash
# 1. Generate
nx g @nx/angular:lib shared/feature-my-feature \
  --buildable \
  --tags="scope:shared,type:feature"

# 2. Build your components/services in shared/feature-my-feature/src/lib/

# 3. Export from the public barrel
#    shared/feature-my-feature/src/index.ts

# 4. Import anywhere
import { MyThing } from '@my-workspace/shared/feature-my-feature';
```

## Project-specific features

Code that is unique to one project lives inside that project folder and is never imported by another project. The ESLint boundary rules enforce this automatically and will fail CI if violated.

```
projects/project-one/src/app/feature-dashboard/   ← project-one only
projects/project-one/src/app/feature-reports/     ← project-one only
projects/project-two/src/app/feature-analytics/   ← project-two only
projects/project-two/src/app/feature-settings/    ← project-two only
```
