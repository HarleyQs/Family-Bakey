# Family Bakery — Project Plan & Status

> **Maintenance rule:** This file is a living document. Whenever a commit lands, a feature is completed, or a bug is fixed on this project, update the relevant section below (Status, Known Issues, Changelog) before considering the work done. This applies whether the change is made by a human or by Claude — if you're an AI assistant picking up work here, read this file first, and edit it as part of the same turn you make the code change, not as a follow-up.

---

## 1. Overview

Production-ready fullstack system to run a real, two-branch family bakery: Sales, Production, Recipe Management, Stock, Finance, Analytics, plus role-based User System. Solo, unpaid, ~10 hrs/week alongside a full-time job. Original target: end of 2025 (slipping — see Status).

Full business/feature spec lives in Notion (not fetchable by tooling — login-walled). A snapshot is kept in Claude's project memory (`family-bakery-overview.md`, `family-bakery-features-roles.md`) and should be treated as source of truth for scope/access rules until the Notion doc changes.

**Tech stack:** React + TypeScript (frontend, Vite) · Spring Boot / Java (backend) · MySQL (prod/Docker), H2 in-memory (local dev).

**Users are non-technical bakery staff** — every UI decision should favor simple, guided flows over power-user density.

**Roles (per spec):** Admin, Owner, Manager, Accounting, Head Baker (`BAKER` in code), Cashier.

---

## 2. Module Status

| Module | Status | Notes |
|---|---|---|
| Recipe Management | 🟡 Mostly working | CRUD for Recipe + Ingredient done both ends. Service-layer refactor in progress (see §4). |
| Ingredient Management | 🟡 Mostly working | CRUD done. Controller bypasses service layer (autowires repository directly). |
| Auth / Sign-in | 🟢 Done | Real session auth: BCrypt + `UserDetailsService` + DB-backed users, seeded test accounts per role. See §3. |
| User System / RBAC | 🟡 Partial | Role vocabularies now aligned (6 spec roles both ends). Client-side route/nav guards follow the spec matrix. **Still no server-side per-endpoint enforcement** — `SecurityConfig` remains `permitAll()` (see §3). |
| Sales | ⚪ Not started | `Sale`, `BranchSale`, `BranchSaleItem` entities exist, no controller/service, no frontend page. Two competing data models exist (`Sale` standalone vs `BranchSale`/`BranchSaleItem` — needs a decision, see §5). |
| Production | ⚪ Not started | `ProductionLog`, `ProductionBatch`, `ProductionBatchItem` entities exist, no controller/service, no frontend page. |
| Stock Management | ⚪ Not started | `IngredientStock`, `BreadStock` entities exist (with threshold field), no controller/service, no frontend page. |
| Finance | ⚪ Not started | No entities, no code yet. |
| Analytics Dashboard | ⚪ Not started | `HomePage.tsx` is a placeholder card only. Nav link exists, no route. |
| Infra (Docker) | 🔴 Broken | `infra/docker-compose.yml` references stale `../backend`/`../frontend` paths (repo uses `bakery-backend`/`bakery-frontend`). No Dockerfile in `bakery-backend/`. |

Legend: 🔴 broken/blocking · 🟡 partial/in-progress · ⚪ not started · 🟢 done

---

## 3. Auth / RBAC — current state

Sign-in is now real (done on `feature/signin-page`, 2026-07-24):

**Backend:**
- Session-based auth: `AuthenticationManager` + `UserDetailsServiceImpl` (backed by `UserRepository`) + BCrypt `PasswordEncoder`. No JWT — the "token" concept was dropped in favor of the `JSESSIONID` cookie (fits same-origin Vite-proxy setup; revisit if a mobile client ever appears).
- `User` entity now has `email` (unique) / `name` / `password` / `Role`; table renamed `app_user` (`user` is reserved in some DBs).
- `UserSeeder` seeds one account per role on startup (H2 in-memory only — replace with real user management before pointing at MySQL). Credentials: `<role>@familybakery.com` / `<role>123` (baker uses `baker@…`/`baker123`).
- `/api/auth/signin` (401 on bad credentials — the old catch-all "any password works" user is gone), `/api/auth/session` (restores session on page reload), `/api/auth/logout` (invalidates the server session via `SecurityContextLogoutHandler`).
- Old mock `SessionController` deleted — superseded by `AuthController.session()`.

**Frontend:**
- `UserRole` now matches the backend/spec 6 roles: `admin, owner, manager, accounting, baker, cashier` (lowercase over the wire; backend lowercases `Role.name()` in responses).
- `rolePermissions` follows the spec's cross-module access matrix (see memory `family-bakery-features-roles.md`); added `READ/WRITE_PRODUCTION` and `READ/WRITE_FINANCE` permissions.
- `AuthContext` no longer stores a fake token in localStorage; auth state lives in the server session cookie (`axios.defaults.withCredentials = true`).
- NavBar links filtered per the matrix (e.g. baker sees Production but not Sales; cashier sees Sales only).

**Still open (blocking "done" for User System/RBAC):**
1. **Server-side per-endpoint authorization** — `SecurityConfig` still `permitAll()`s everything; add role-based `requestMatchers` rules per the access matrix.
2. Wire `config/routes.ts` into actual routing, or delete it if superseded (still unused by `App.tsx`/`NavBar.tsx`).
3. Sign up / forgot-password links on the sign-in page are dead (`/signup`, `/forgot-password` routes don't exist) — implement or remove.
4. User management UI (create/edit users) — currently seed-only.

---

## 4. In-progress work (as of last update)

- **JSON content-type fix** (Recipe/Ingredient `/active` endpoints): backend now forces `produces = "application/json"`; frontend now defensively checks `Array.isArray()` and maps DTOs field-by-field instead of trusting the raw response shape. Root cause of the original bug: unreliable response typing was breaking the ingredient dropdown in `RecipeDetail.tsx`.
- **`RecipeService.java`** added (mirrors `BreadService`/`IngredientService` CRUD-wrapper pattern) but **not yet wired into `RecipeController`**, which still autowires `RecipeRepository` directly. Finish the refactor: move CRUD logic into the service, have the controller depend on it.
- `IngredientController` also bypasses its service layer the same way — same refactor applies there.
- `BreadIngredientService.java` is a stub (holds a repository field, no methods) — either implement or remove.

---

## 5. Known issues / decisions needed

- **Two parallel sales models**: `Sale` (standalone, `productId` as raw `Long`, no FK) vs `BranchSale`/`BranchSaleItem` (proper relations, per-branch). Pick one before building the Sales module — `BranchSale`/`BranchSaleItem` looks like the intended direction given the spec's per-branch requirement; `Sale` may be leftover/experimental.
- **`BreadFilling`** has no `amount` field — likely incomplete, revisit when Recipe/Bread pricing logic needs filling quantities.
- **Docker Compose paths are stale** (`infra/docker-compose.yml` points at `../backend`/`../frontend`, actual dirs are `bakery-backend`/`bakery-frontend`), and no backend Dockerfile exists. Needs a pass before Docker-based dev/deploy works again.
- **Triple CORS configuration**: `SecurityConfig` CORS bean, `CorsConfig` (`WebMvcConfigurer`), and per-controller `@CrossOrigin` annotations all active simultaneously with slightly different allowed origins (some hardcode `5173` only). Consolidate into one source of truth once auth work stabilizes what origins are actually needed.
- **No DB migration tooling** — schema is Hibernate `ddl-auto=update` only, no Flyway/Liquibase. Fine for now (solo, pre-launch); revisit before this touches real production data at the two branches.
- **Vite proxy vs Docker networking**: `vite.config.ts` proxies `/api` to `localhost:8080`, which won't resolve inside the Docker network (would need `backend:8080` there). Only matters once Docker infra is fixed.

---

## 6. Suggested build order

Roughly following the spec's data dependency chain (Production needs Recipes; Sales needs Production; Finance needs Sales+Stock; Dashboard needs everything):

1. **Server-side RBAC enforcement** (§3) — sign-in is done, but every endpoint is still wide open (`permitAll()`); nothing else should be considered "done" until that's closed.
2. **Finish Recipe/Ingredient refactor** (§4) — small, already in flight.
3. **Stock Management** — inventory + thresholds; needed before Production can warn on shortages.
4. **Production** — daily production input, dough/ingredient calc, ties into Stock.
5. **Sales** — EOD leftover input, resolve the `Sale` vs `BranchSale` question first.
6. **Finance** — depends on Sales (income) + Stock orders (expenses).
7. **Dashboard** — last, since it's read-only aggregation of everything above.

---

## 7. Changelog

- **2026-07-24** — **Real sign-in implemented** (`feature/signin-page`): session-based auth (BCrypt + `UserDetailsService` + DB users + per-role seeder), 401 on bad credentials, working session restore and server-side logout; deleted mock `SessionController`. Frontend roles aligned to the spec's 6 roles, `rolePermissions` rewritten from the access matrix, fake-token localStorage flow removed. Verified end-to-end in a browser (login, bad creds, reload persistence, logout, per-role nav). Server-side endpoint authorization still open.
- **2026-07-24** — Initial version of this plan created after full codebase + Notion spec review. Captured current module status, auth gap, in-progress recipe refactor, and known issues.
