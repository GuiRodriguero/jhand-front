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

| Layer              | Technology                                                 |
| ------------------ | ---------------------------------------------------------- |
| UI / Runtime       | **React 19** + **React Compiler** (auto-memoization)       |
| Language           | **TypeScript** (`strict` mode)                             |
| Build / Dev Server | **Vite 8** (`@vitejs/plugin-react`)                        |
| Styling            | **TailwindCSS 4** (config via `@theme` in CSS)             |
| Routing            | **react-router-dom 7**                                     |
| HTTP               | **axios** (single instance in `src/lib/axios.ts`)          |
| Server state       | **TanStack Query 5** (`useQuery` / `useMutation`)          |
| Class names        | **clsx** + **tailwind-merge** via `cn()` (`src/lib/cn.ts`) |
| Tests              | **Vitest** (pure functions / utils)                        |
| i18n               | **i18next** + **react-i18next** (pt / en, type-safe)       |
| Icons              | **lucide-react**                                           |
| Charts             | **recharts 3**, only behind `components/ui/line-chart`     |
| Lint               | **ESLint 9** (flat config) + **typescript-eslint**         |
| Formatting         | **Prettier**                                               |

> There is **no** global client-state management (Redux/Zustand/etc.). **Server state** (data from
> the API) lives in **TanStack Query**; UI state is local per _view_ + occasional Context API;
> **filters/pagination** live in the **URL** (`useSearchParams`).

### Scripts (`package.json`)

```bash
npm run dev       # development server (Vite + HMR)
npm run build     # tsc -b && vite build (type-check + production build)
npm run lint      # eslint . (type-aware rules)
npm test          # vitest run
npm run test:watch
npm run preview   # preview of the production build
```

---

## 3. Business Glossary (Poker Domain)

When working on the code, use **these exact terms** to name variables, types, and i18n keys.

| Term               | Meaning                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **Hand**           | A single played hand. Central entity. Has `handId`, `sessionId`, cards, board, result, date. |
| **Hero**           | The player who owns the history (the "me"). `heroCards` are the Hero's cards.                |
| **Hero Cards**     | The Hero's 2 starting cards (_hole cards_). E.g.: `"As Kh"`.                                 |
| **Board**          | Community cards (flop, turn, river). E.g.: `"2c 7d Th Js Ac"`.                               |
| **Hand Rank**      | The strength/category of the final hand (e.g., _Flush_, _Straight_, _Pair_).                 |
| **Session**        | A grouping of hands played in the same period/table (`sessionId`).                           |
| **Net Profit**     | Net profit (gain/loss) of that hand or aggregate, in monetary units.                         |
| **VPIP**           | _Voluntarily Put money In Pot_ — % of hands where the player voluntarily put money in.       |
| **PFR**            | _Pre-Flop Raise_ — % of hands where the player raised pre-flop.                              |
| **Bankroll**       | Evolution of the player's balance over time (chart on the dashboard).                        |
| **Pre-Flop Chart** | Strategy table/grid for starting hands pre-flop (study tool).                                |
| **HandHistory**    | `.txt` files exported by the poker client (PokerStars) containing the raw hand history.      |

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
├── App.tsx                 # Route definitions (inside MainLayout). Views with charts are `lazy` + <Suspense>,
│                           #   so recharts lives in its own chunk, downloaded only when a chart page opens
│
├── lib/                    # Cross-cutting infra, no UI
│   ├── axios.ts            # Single axios instance (baseURL, timeout) + isNotFoundError (backend 404)
│   ├── i18n.ts             # i18next config + translation dictionary (pt/en)
│   ├── cn.ts               # cn() = clsx + tailwind-merge
│   ├── page.types.ts       # Page<T> (Spring Data pagination)
│   ├── queryClient.ts      # TanStack QueryClient (defaults)
│   ├── queryKeys.ts        # Central query keys (shared so features can invalidate each other); every
│   │                       #   sessions key starts with 'sessions', so invalidating `sessions.all` covers them
│   ├── position.ts         # Position ('BTN' | 'SB' | 'BB' | 'CO' | 'MP' | 'UTG'), shared by Hands and Sessions
│   └── sessionType.ts      # SessionType ('CASH_GAME' | 'TOURNAMENT'), default + `?type=` URL reader
│
├── layouts/
│   └── MainLayout.tsx      # Application shell (Sidebar + <main>)
│
├── components/session-type-tabs/  # SessionTypeTabs: Cash / Tournament tabs shared by Hands and Sessions
│                           #   (shared but domain-aware, hence outside components/ui)
│
├── components/ui/          # REUSABLE UI components (domain-agnostic)
│   ├── button/             # JHandButton (variants: primary | ghost | outline)
│   ├── card/               # JHandCard  (base container)
│   ├── card-picker/        # CardDeckPicker (52-card clickable deck, disabled = used cards)
│   ├── line-chart/         # JHandLineChart: single-series line on recharts (point-number X axis, nice Y
│   │                       #   ticks incl. zero via lineChartScale.niceDomain, tooltip, arrow keys, click a
│   │                       #   point). Features use JHandLineChart, never recharts directly; colors are the
│   │                       #   theme CSS variables (`var(--color-info)`)
│   ├── hand-matrix/        # HandMatrix (13x13 grid, click/drag paint, frequency gradients)
│   │                       #   + matrixHands (labels/combos) + rangeNotation (parseRange "22+, ATs+")
│   ├── playing-card/       # PlayingCard + parseCards/toCardCode + card.constants (RANKS, SUITS)
│   │                       #   + card.types (Rank, Suit, ParsedCard) + cardStyles (SUIT_SYMBOL/COLOR)
│   ├── pagination/         # JHandPagination (previous/next + "page / total", hidden when 1 page)
│   ├── segmented-control/  # JHandSegmentedControl (generic tabs: role="tablist", options with icon)
│   ├── sidebar/            # Sidebar + SidebarLink
│   ├── status/             # JHandLoading (spinner + default.loading), JHandErrorMessage (alert + message)
│   ├── table/              # JHandTable (table shell: header slot + loading / error / empty states)
│   ├── text-input/         # JHandInput (input with forwardRef)
│   ├── select/             # (reserved)
│   └── toast/              # ToastContext.ts + ToastProvider.tsx + useToast.ts (one export kind per file)
│
├── features/               # One package per business domain
│   ├── dashboard/
│   ├── hands/
│   ├── pre-flop-chart/
│   ├── sessions/           # Sessions list (one imported file = one session), filtered by session type;
│   │                       #   a row opens SessionDetailView (/sessions/:sessionId): summary tiles, chart,
│   │                       #   best/worst hand, result by position, link to the session's hands
│   └── settings/
│
├── @types/                 # Type augmentation (i18next.d.ts: type-safe keys; react.d.ts: webkitdirectory)
├── assets/                 # Static images
└── index.css               # Tailwind import + @theme (design tokens) + utilities
```

### Internal structure of a _feature_

Each feature follows the same subfolder pattern (create only the ones needed):

```
features/<feature>/
├── views/          # "Page" component (orchestrates state, calls services, composes components)
├── components/     # Feature-specific presentation components (receive props)
├── hooks/          # TanStack Query hooks (useXxxQuery / useXxxMutation) wrapping the services
├── services/       # REST API calls (uses the axios instance from lib/)
├── types/          # Feature types/DTOs
└── utils/          # Pure functions (+ colocated *.test.ts)
```

### Dependency rules (who knows whom)

- `features/*` **may** import from `components/ui`, `lib`, `@types`.
- `components/ui/*` are **domain-agnostic**: they do **NOT** import from `features/*` nor know business
  rules. They receive everything via props.
- A feature must **NOT** import from `views`/`components` of **another** feature. If something needs to
  be shared between features, **promote** it to `components/ui` (or `lib`).
- `lib/*` does not import from `features` nor `components`.
- Data flow: `View` → calls `hooks` (TanStack Query) → which call `service` → receives `types` →
  View distributes to `components` via props.

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
- Associate labels with inputs via `useId()` + `htmlFor` (never hardcode DOM ids).
- Don't sync props into state with `useEffect`; adjust state during render (see `HeroCardsFilter`)
  or lift the state up.
- **React Compiler is active** → do **not** add `useMemo`/`useCallback`/`React.memo` manually,
  unless there is a real and measured reason. (Note: the current code still uses `useCallback` in
  some legacy spots; prefer not to introduce new ones.)

### TypeScript

- `strict` mode + `noUnusedLocals`/`noUnusedParameters` are on → **no unused variables/imports** and
  **no implicit `any`**.
- `verbatimModuleSyntax` is on → use **`import type { ... }`** for imports that are types only.
- **Imports**: use the **`@/` alias** (= `src/`) for anything outside the current feature, and
  relative `./` / `../` only inside the same feature/component folder. **Never** include the
  `.ts`/`.tsx` extension. Never use `../../../`.
- Pagination typing follows the Spring backend pattern: use the generic type **`Page<T>`** from
  `@/lib/page.types` (`content`, `totalPages`, `number`, `size`, `first`, `last`).
- Always type axios calls: `api.get<Page<HandResult>>(...)` (otherwise `data` is `any`).

### Styling (TailwindCSS 4)

- **Utility-first**: styles via `className`. Do **not** create per-component CSS files.
- Combine classes with **`cn()`** (`@/lib/cn`), never with template strings — it drops falsy values
  and resolves Tailwind conflicts so a `className` prop can override defaults.
- Buttons: use **`JHandButton`** instead of styling a raw `<button>`.
- **Design tokens** live in `src/index.css` inside `@theme`. **Use the semantic tokens**, not
  hardcoded colors when an equivalent token exists:
  - Background: `bg-background`, `bg-surface`, `bg-surface-dark/light/lighter`.
  - Borders: `border-border`, `border-border-subtle`.
  - Text: `text-foreground`, `text-foreground-muted`, `text-foreground-strong`.
  - Primary action: `bg-primary`, `hover:bg-primary-hover`, `text-primary-content`, `ring-primary-ring`.
  - States: `success` / `error` / `info` (+ `-content` variants for text and `-shadow`).
  - Playing cards: `bg-card-face`, `text-card-red`, `text-card-black`.
  - A token `--color-x` becomes the class `bg-x` / `text-x` (**not** `bg-color-x`).
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
- Views consume services through **TanStack Query hooks** in `features/<f>/hooks/`
  (`useHandsQuery`, `useImportBatchMutation`). Query keys come from `@/lib/queryKeys`. Pass the
  `signal` from `queryFn` to the service so outdated requests are cancelled.
- Mutations that change server data must **invalidate** the affected query keys in `onSuccess`.
- Endpoints are **versioned**: `/v1/...`.
- Handle optional query params as in `handsApi.findAll` (only include the param if there is a value,
  using `.trim()`).
- File uploads use `FormData` (see `importApi.importBatch`).

### User feedback / errors

- Notifications via **`useToast()`** (`showToast(message, 'success' | 'error' | 'info')`), with the
  message coming from i18n.
- Async call pattern in components (mutation):

  ```tsx
  const importBatch = useImportBatchMutation();
  importBatch.mutate(variables, {
    onSuccess: () => showToast(t('...successToast'), 'success'),
    onError: () => showToast(t('...errorToast'), 'error'),
  });
  // importBatch.isPending → loading state
  ```

- Queries: use `isPending` (first load), `isError` (`default.errorResult`) and `isPlaceholderData`
  (refreshing with `keepPreviousData`).

- UI states to always consider: **loading**, **empty** (`default.emptyResult`), and **error**.

---

## 6. Backend Integration

- The backend is a separate **Java/Spring** application, base `http://localhost:8080/` (`lib/axios.ts`).
- Frontend DTOs **mirror** the backend ones. Pagination follows Spring Data's `Page`
  (hence the `Page<T>` type).
- Known endpoints:
  - `GET /v1/hands` — paginated list of hands (params: `page`, `size`, `sessionType`, `handId?`,
    `sessionId?`, `heroCards?`, `handRank?`).
  - `GET /v1/sessions` — paginated list of sessions (params: `page`, `size`, `type`). Returns
    `{ sessionId, type, handCount, startTime, endTime, netProfit }` plus the type's own fields, sorted by `startTime`
    desc (`endTime` = start of the last hand). `PokerSession` is a union discriminated by `type`: `CashSession` adds
    `bigBlind`, `TournamentSession` adds `buyIn, prize, finishPosition, realMoney`. Narrow on `type` before
    reading them. Each type has its own table component (`CashSessionTable` / `TournamentSessionTable`);
    `keepPreviousData` only applies while the type stays the same, so a tab switch shows the loading state. While a tournament is still running
    `prize`/`finishPosition` are `null` and `netProfit` is the buy-in lost (−buy-in).
  - `GET /v1/sessions/{sessionId}` — one session, same body as a list item; unknown id → 404 (`isNotFoundError`).
  - `GET /v1/sessions/{sessionId}/hand-stats` — `SessionHandStats`: `points[]` (one per hand, by time:
    `cumulativeNetProfit(InBb)`, `startingStack`, `stackInBb`), `vpipPercentage`, `pfrPercentage`, `bbPer100`,
    `bestHand`/`worstHand` (by BB), `byPosition[]`. Its amounts are in the **hands'** unit (tournament: chips).
    The chart plots the cumulative result for cash and the **stack** for tournaments (`chartValues`): the cumulative
    BB result is not a stack once the blinds grow.
  - Session ids are file names (spaces, `$`, `'`): always `encodeURIComponent` them in API paths and routes
    (`sessionsApi`, `sessionDetailPath`). Links to the Hands view use its `handId` / `sessionId` filters (`handsPath`).
- **Session type**: Hands and Sessions always show **one** type (Cash or Tournament, tab in the header,
  `?type=` in the URL, default Cash). Never mix them. Units:
  - cash hands and cash sessions are **dollars**;
  - tournament **hands** are **chips**;
  - a tournament **session** is **prize − buy-in**, in dollars when `realMoney` is true and in play money (no
    `$`) otherwise (`formatSessionProfit` / `formatSessionMoney`). The Tournament tab also shows Placement,
    Buy-in and Prize; the Cash tab shows the session's big blind (Blind column).
  - `POST /v1/hands/import/batch` — batch import of `.txt` files (`multipart/form-data`,
    fields `files` + `heroName`).

> When creating a new service, confirm the real contract with the backend before assuming field names.

---

## 7. Testing

**Current state:** **Vitest** is installed (no DOM environment / Testing Library yet).

- Tests are colocated next to the code: `foo.ts` → `foo.test.ts` (`src/**/*.test.{ts,tsx}`).
- Focus on **pure functions** (`parseCards`, `features/*/utils/*`). Extract logic out of components
  into `utils/` so it can be tested.
- Import `describe` / `it` / `expect` explicitly from `'vitest'` (globals are off).
- **One test per real scenario, as simple as possible — no filler.** A scenario is a distinct path through the code
  under test (a branch, a rule, an edge the logic actually treats differently), not another input to the same
  path. E.g. `formatSessionMoney` has three: missing value (`-`), dollars (cash or `realMoney`), play money —
  one case each, not a table of amounts that all go through the same branch. Use `it.each` only when every row
  hits a different branch/rule (e.g. `formatPlacement`: `1st`/`2nd`/`3rd`/`4th`/`11th` are different plural
  rules). Cover every branch, including the fallback/error one.
- To test **components**, first install `@testing-library/react` + `@testing-library/jest-dom` +
  `jsdom` and set `test.environment: 'jsdom'` in `vite.config.ts` — make it explicit in the response.
  Do **NOT** import testing libraries that are not in `package.json`.
- Verification after any change:

  ```bash
  npm run build   # includes tsc -b (type-check)
  npm run lint
  npm test
  ```

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
- [ ] `npm run build`, `npm run lint` and `npm test` pass without errors.
- [ ] Accessibility: icon-only buttons have `aria-label`, decorative icons `aria-hidden`, labels
      linked to inputs.
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
- ❌ Fetching with `useEffect` + `useState` — use a TanStack Query hook.
- ❌ Concatenating classes with template strings — use `cn()`.
- ❌ Two files in the same folder whose names differ only by case (e.g. `HandMatrix.tsx` + `handMatrix.ts`):
  breaks the build on Windows/macOS.
- ❌ Deep relative imports (`../../../`) or imports with `.ts`/`.tsx` extensions — use `@/`.
- ❌ Reimplementing card parsing/rendering instead of using `parseCards` / `PlayingCard`.
