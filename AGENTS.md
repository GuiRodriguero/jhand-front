# AGENTS.md — JHand Front

> Guide to the architecture, domain, and conventions of **JHand Front**. The goal of this document is
> to make any future prompt/task more assertive, ensuring that any change respects the patterns
> already established in the project. **Read this file before writing or modifying code.**

---

## 1. Overview

**JHand** is a web application for **poker hand analysis and study** (poker tracker/HUD-like).
The user imports the hand history exported by poker clients (e.g., **PokerStars** — `.txt`
_HandHistory_ files), and the app processes, stores, and displays statistics, hand results, and
study tools (e.g., pre-flop chart).

This repository (`jhand-front`) is **frontend only**. It consumes a **separate REST API**
(Java/Spring backend, see section 6) hosted by default at `http://localhost:8080/`.

---

## 2. Tech Stack

| Layer              | Technology                                             |
| ------------------ | ------------------------------------------------------ |
| UI / Runtime       | **React 19** + **React Compiler** (auto-memoization)   |
| Language           | **TypeScript** (`strict` mode)                         |
| Build / Dev Server | **Vite 8** (`@vitejs/plugin-react`)                    |
| Styling            | **TailwindCSS 4** (config via `@theme` in CSS)         |
| Routing            | **react-router-dom 7**                                 |
| HTTP               | **axios** (single instance in `src/lib/axios.ts`)      |
| i18n               | **i18next** + **react-i18next** (pt / en, type-safe)   |
| Icons              | **lucide-react**                                       |
| Lint               | **ESLint 9** (flat config) + **typescript-eslint**     |
| Formatting         | **Prettier**                                           |

> ⚠️ There is **no** testing library installed (see section 7). There is **no** global state
> management (Redux/Zustand/etc.) — state is local per _view_ + occasional Context API.

### Scripts (`package.json`)

```bash
npm run dev       # development server (Vite + HMR)
npm run build     # tsc -b && vite build (type-check + production build)
npm run lint      # eslint .
npm run preview   # preview of the production build
```

---

## 3. Business Glossary (Poker Domain)

When working on the code, use **these exact terms** to name variables, types, and i18n keys.

| Term             | Meaning                                                                                              |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| **Hand**         | A single played hand. Central entity. Has `handId`, `sessionId`, cards, board, result, date.         |
| **Hero**         | The player who owns the history (the "me"). `heroCards` are the Hero's cards.                        |
| **Hero Cards**   | The Hero's 2 starting cards (_hole cards_). E.g.: `"As Kh"`.                                         |
| **Board**        | Community cards (flop, turn, river). E.g.: `"2c 7d Th Js Ac"`.                                       |
| **Hand Rank**    | The strength/category of the final hand (e.g., _Flush_, _Straight_, _Pair_).                         |
| **Session**      | A grouping of hands played in the same period/table (`sessionId`).                                   |
| **Net Profit**   | Net profit (gain/loss) of that hand or aggregate, in monetary units.                                 |
| **VPIP**         | _Voluntarily Put money In Pot_ — % of hands where the player voluntarily put money in.               |
| **PFR**          | _Pre-Flop Raise_ — % of hands where the player raised pre-flop.                                      |
| **Bankroll**     | Evolution of the player's balance over time (chart on the dashboard).                                |
| **Pre-Flop Chart** | Strategy table/grid for starting hands pre-flop (study tool).                                      |
| **HandHistory**  | `.txt` files exported by the poker client (PokerStars) containing the raw hand history.              |

### Card Notation

- Format: `<rank><suit>` concatenated, separated by spaces. E.g.: `"As Kh"`, `"Tc"`.
- Valid **ranks**: `2 3 4 5 6 7 8 9 T J Q K A` (stored/displayed in uppercase).
- **Suits**: `s` (♠ spades), `h` (♥ hearts), `c` (♣ clubs), `d` (♦ diamonds).
- Red suits (`h`, `d`) are rendered in red; black ones (`s`, `c`) in dark gray.
- The conversion from string → typed object is **always** done by `parseCards()`
  (`src/components/ui/playing-card/parseCards.ts`). **Do not** reimplement card parsing.

---

## 4. Folder Architecture

The project uses a **feature-based architecture (feature-based / vertical slicing)**. Each business
domain lives isolated in `src/features/<feature>/`, and whatever is genuinely shared goes in
`src/components`, `src/lib`, `src/layouts`.

```
src/
├── main.tsx                # Entry point: mounts global providers (Router, Toast) and imports i18n/css
├── App.tsx                 # Route definitions (inside MainLayout)
│
├── lib/                    # Cross-cutting infra, no UI
│   ├── axios.ts            # Single axios instance (baseURL, timeout)
│   └── i18n.ts             # i18next config + translation dictionary (pt/en)
│
├── layouts/
│   └── MainLayout.tsx      # Application shell (Sidebar + <main>)
│
├── components/ui/          # REUSABLE UI components (domain-agnostic)
│   ├── card/               # JHandCard  (base container)
│   ├── playing-card/       # PlayingCard + parseCards + types (Suit, ParsedCard)
│   ├── sidebar/            # Sidebar + SidebarLink
│   ├── text-input/         # JHandInput (input with forwardRef)
│   ├── select/             # (reserved)
│   └── toast/              # ToastContext + ToastProvider + useToast
│
├── features/               # One package per business domain
│   ├── dashboard/
│   ├── hands/
│   ├── pre-flop-chart/
│   └── settings/
│
├── @types/                 # Type augmentation (e.g., i18next.d.ts makes keys type-safe)
├── assets/                 # Static images
├── index.css               # Tailwind import + @theme (design tokens) + utilities
└── App.css                 # App-specific styles
```

### Internal structure of a _feature_

Each feature follows the same subfolder pattern (create only the ones needed):

```
features/<feature>/
├── views/          # "Page" component (orchestrates state, calls services, composes components)
├── components/     # Feature-specific presentation components (receive props)
├── services/       # REST API calls (uses the axios instance from lib/)
└── types/          # Feature types/DTOs
```

### Dependency rules (who knows whom)

- `features/*` **may** import from `components/ui`, `lib`, `@types`.
- `components/ui/*` are **domain-agnostic**: they do **NOT** import from `features/*` nor know business
  rules. They receive everything via props.
- A feature must **NOT** import from `views`/`components` of **another** feature. If something needs to
  be shared between features, **promote** it to `components/ui` (or `lib`).
- `lib/*` does not import from `features` nor `components`.
- Data flow: `View` → calls `service` → receives `types` → distributes to `components` via props.

---

## 5. Code Conventions

### Naming

- **React components**: `PascalCase`, one component per file, file = component name
  (`HandResultTable.tsx`).
- **Shared UI components**: **`JHand`** prefix (`JHandCard`, `JHandInput`). Keep this prefix when
  creating new reusable base components.
- **Views (pages)**: **`View`** suffix (`DashboardView`, `HandResultView`).
- **Services**: exported object with **`Api`** suffix (`handsApi`, `importApi`).
- **Type files/types**: `*.types.ts` (`handResult.types.ts`, `dashboard.types.ts`).
- **Utility functions**: `camelCase` (`parseCards`, `buildValue`).
- Prefer **named exports** (`export function ...`). The only `export default` is `App.tsx`.

### Components

- **Functional** components + **hooks**. No class components.
- **Props**: declare a dedicated `interface`/`type`. Mark the fields as **`readonly`** (predominant
  pattern in the project). E.g.: `interface StatCardProps { readonly title: string; ... }`.
- **Presentation** components receive data and callbacks via props; they do **not** fetch.
- **Container/view** components hold the state (`useState`), effects (`useEffect`), and call the
  services.
- For inputs that need a `ref`, use `forwardRef` (see `JHandInput`).
- **React Compiler is active** → do **not** add `useMemo`/`useCallback`/`React.memo` manually,
  unless there is a real and measured reason. (Note: the current code still uses `useCallback` in
  some legacy spots; prefer not to introduce new ones.)

### TypeScript

- `strict` mode + `noUnusedLocals`/`noUnusedParameters` are on → **no unused variables/imports** and
  **no implicit `any`**.
- `verbatimModuleSyntax` is on → use **`import type { ... }`** for imports that are types only.
- `allowImportingTsExtensions` is on → note that **some imports include the extension** (`.ts` /
  `.tsx`). Be consistent with the file you are editing.
- Pagination typing follows the Spring backend pattern: use the generic type **`Page<T>`**
  (`content`, `totalPages`, `number`, `size`, `first`, `last`).

### Styling (TailwindCSS 4)

- **Utility-first**: styles via `className`. Do **not** create per-component CSS files.
- **Design tokens** live in `src/index.css` inside `@theme`. **Use the semantic tokens**, not
  hardcoded colors when an equivalent token exists:
  - Background: `bg-background`, `bg-surface`, `bg-surface-dark/light/lighter`.
  - Borders: `border-border`, `border-border-subtle`.
  - States: `success` / `error` / `info` (+ `-content` variants for text and `-shadow`).
- The theme is **dark** by default.
- For scrollable lists, reuse the `.custom-scrollbar` utility (defined in `index.css`).
- Icons always via **`lucide-react`** (`import { Spade } from 'lucide-react'`).

### Internationalization (i18n) — mandatory

- **No user-facing string should be hardcoded.** Use `const { t } = useTranslation();` and
  `t('nested.key')`.
- Languages: **`pt`** and **`en`**, with `fallbackLng: 'en'`. Translations live **inline** in the
  `resources` object in `src/lib/i18n.ts`.
- When adding a key, add it in **both `pt` AND `en`**, keeping the same nested structure.
- Keys are **type-safe**: `src/@types/i18next.d.ts` derives the types from `resources`. A nonexistent
  key = type error.
- Interpolation with `{{var}}`: `t('settings.upload.filesFound', { count: n })`.

### API Communication

- **Always** use the `api` instance from `src/lib/axios.ts`. Do **not** call `axios` directly nor
  create new instances.
- Every network call lives in a **service** (`features/<f>/services/*Api.ts`), as an object with
  `async` methods. Views do **not** call axios directly.
- Endpoints are **versioned**: `/v1/...`.
- Handle optional query params as in `handsApi.findAll` (only include the param if there is a value,
  using `.trim()`).
- File uploads use `FormData` (see `importApi.importBatch`).

### User feedback / errors

- Notifications via **`useToast()`** (`showToast(message, 'success' | 'error' | 'info')`), with the
  message coming from i18n.
- Async call pattern in components:

  ```tsx
  setIsLoading(true);
  try {
    await someApi.doThing();
    showToast(t('...successToast'), 'success');
  } catch {
    showToast(t('...errorToast'), 'error');
  } finally {
    setIsLoading(false);
  }
  ```

- UI states to always consider: **loading**, **empty** (`default.emptyResult`), and **error**.

---

## 6. Backend Integration

- The backend is a separate **Java/Spring** application, base `http://localhost:8080/` (`lib/axios.ts`).
- Frontend DTOs **mirror** the backend ones. Pagination follows Spring Data's `Page`
  (hence the `Page<T>` type).
- Known endpoints:
  - `GET /v1/hands` — paginated list of hands (params: `page`, `size`, `handId?`, `sessionId?`,
    `heroCards?`, `handRank?`).
  - `POST /v1/hands/import/batch` — batch import of `.txt` files (`multipart/form-data`,
    fields `files` + `heroName`).

> When creating a new service, confirm the real contract with the backend before assuming field names.

---

## 7. Testing

**Current state:** the project **does not have** a testing framework configured (there is no Vitest,
Jest, Testing Library, Playwright, etc. in `package.json`).

Guidelines for agents:

- Do **NOT** invent imports of nonexistent testing libraries. Never use `expect`/`assert` from libs
  that are not installed.
- If a task **requires** tests, first **propose and install** the standard Vite ecosystem stack
  (**Vitest** + **@testing-library/react** + **@testing-library/jest-dom**) and adjust `vite.config.ts`
  and the scripts — making it explicit in the response.
- The minimum verification available today is **type-check + build + lint**:

  ```bash
  npm run build   # includes tsc -b (type-check)
  npm run lint
  ```

  Run them after any change to ensure the project still compiles and has no lint errors.

---

## 8. Checklist for Changes (Definition of Done)

Before considering a task complete:

- [ ] Code in the **correct feature/folder**, respecting the dependency rules (section 4).
- [ ] Components with **typed and `readonly` props**; no `any`; no unused imports/variables.
- [ ] **Zero hardcoded strings** — everything via i18n, with keys added in **both `pt` and `en`**.
- [ ] Network calls in a **service** using the `api` instance; loading/error/empty handled.
- [ ] Styles with **Tailwind utilities + semantic tokens**; no per-component CSS.
- [ ] Reuse base components (`JHandCard`, `JHandInput`, `PlayingCard`, `parseCards`...) instead of
      duplicating.
- [ ] `npm run build` and `npm run lint` pass without errors.
- [ ] Changes consistent with the **style of the file/neighborhood** you edited.

---

## 9. What to AVOID

- ❌ Importing `features/*` inside `components/ui/*` (breaks isolation).
- ❌ Putting business logic in shared UI components.
- ❌ Calling `axios` directly or creating new instances.
- ❌ Fetching inside presentation components (do it in the `view`/service).
- ❌ UI strings outside i18n; adding a key in only one language.
- ❌ Hardcoded colors when a semantic token exists.
- ❌ Reintroducing unnecessary manual memoization (React Compiler handles it).
- ❌ Using/mentioning testing libraries that are not in `package.json`.
- ❌ Reimplementing card parsing/rendering instead of using `parseCards` / `PlayingCard`.
