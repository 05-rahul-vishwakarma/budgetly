# finApp - Project Index

**Project:** AI Financial Copilot  
**Version:** 1.0.0  
**Framework:** Expo + React Native + TypeScript  
**Date Indexed:** July 12, 2026

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Directory Structure](#directory-structure)
3. [Architecture](#architecture)
4. [Module Breakdown](#module-breakdown)
5. [Key Technologies](#key-technologies)
6. [File Manifest](#file-manifest)

---

## Project Overview

finApp is a React Native financial management application built with Expo and TypeScript. It provides users with tools for tracking finances, managing budgets, analyzing spending patterns, and connecting to their banking accounts.

**Key Features:**
- User authentication via OTP and phone
- Bank account integration
- Transaction tracking and analysis
- Budget management
- Financial analytics dashboard
- Settings and preferences management

---

## Directory Structure

```
finApp/
├── app/                          # Expo Router routes (UI layer)
│   ├── _layout.tsx              # Root layout
│   ├── (auth)/                  # Authentication flow screens
│   │   ├── bank-intro.tsx
│   │   ├── bank-select.tsx
│   │   ├── otp.tsx
│   │   ├── permissions.tsx
│   │   ├── phone.tsx
│   │   ├── profile.tsx
│   │   └── welcome.tsx
│   ├── (tabs)/                  # Main app tab screens
│   │   ├── index.tsx            # Home/Dashboard
│   │   ├── analytics.tsx
│   │   ├── budget.tsx
│   │   ├── transactions.tsx
│   │   └── settings.tsx
│   └── settings/                # Settings sub-screens
│       ├── appearance.tsx
│       ├── banks.tsx
│       ├── budgets.tsx
│       ├── categories.tsx
│       ├── contact.tsx
│       ├── data.tsx
│       ├── delete-account.tsx
│       ├── feedback.tsx
│       ├── help.tsx
│       ├── notifications.tsx
│       ├── privacy.tsx
│       ├── security.tsx
│       └── terms.tsx
├── src/                         # Business logic & components
│   ├── components/              # Reusable UI components
│   │   └── ui/
│   │       ├── Avatar.tsx
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── ProgressBar.tsx
│   │       └── SplashScreen.tsx
│   ├── constants/               # App constants
│   │   ├── colors.ts
│   │   └── index.ts
│   ├── hooks/                   # Custom React hooks
│   │   ├── index.ts
│   │   └── useAuth.tsx
│   ├── modules/                 # Feature modules (business logic)
│   │   ├── analytics/
│   │   ├── auth/
│   │   ├── banks/
│   │   ├── budget/
│   │   ├── categories/
│   │   ├── home/
│   │   ├── settings/
│   │   └── transactions/
│   ├── providers/               # Context providers
│   │   ├── providers.tsx
│   │   └── ThemeProvider.tsx
│   ├── stores/                  # Global state (Zustand/MobX)
│   │   ├── index.ts
│   │   └── uiStore.ts
│   ├── types/                   # TypeScript type definitions
│   │   └── index.ts
│   └── utils/                   # Utility functions
│       ├── index.ts
│       ├── mmkv.ts             # MMKV storage wrapper
│       └── utils.ts
├── assets/                      # Static assets
│   ├── fonts/
│   └── images/
├── docs/                        # Project documentation
│   ├── 01-Project-Vision.md
│   ├── 02-Features.md
│   ├── 03-Screens.md
│   ├── 04-Design-System.md
│   ├── 05-Roadmap.md
│   └── 06-Tech-Stack.md
├── app.json                     # Expo app config
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript config
├── tailwind.config.js           # Tailwind CSS config
└── README.md                    # Project README
```

---

## Architecture

### Feature-Based Architecture

The project follows a modular, feature-based architecture:

```
src/modules/
├── {feature}/
│   ├── screens/         # Feature screens/pages
│   ├── components/      # Feature-specific components
│   ├── store/          # Feature state management
│   ├── hooks/          # Feature-specific hooks
│   ├── types/          # Feature type definitions
│   └── utils/          # Feature utilities
```

### Layer Separation

- **app/** — Routes & navigation (Expo Router)
- **src/components/** — Shared UI components
- **src/modules/** — Business logic organized by feature
- **src/providers/** — Global context & providers
- **src/stores/** — Global state management
- **src/hooks/** — Custom hooks
- **src/constants/** — App-wide constants
- **src/utils/** — Shared utility functions

---

## Module Breakdown

### 1. **Analytics Module** (`src/modules/analytics/`)
Handles financial analytics and reporting.

**Files:**
- `screens/AnalyticsScreen.tsx` — Main analytics UI
- `types/` — Analytics type definitions

**Purpose:** Display spending patterns, trends, and financial insights.

---

### 2. **Auth Module** (`src/modules/auth/`)
Manages user authentication flow.

**Files:**
- `screens/` — Auth screens
  - `BankSelectScreen.tsx` — Bank selection during signup
  - `OTPScreen.tsx` — OTP verification
  - `PhoneScreen.tsx` — Phone number entry
  - `ProfileScreen.tsx` — User profile setup
  - `WelcomeScreen.tsx` — Welcome screen
- `store/authStore.ts` — Auth state management
- `hooks/` — Auth-specific hooks
- `types/` — Auth type definitions
- `utils/` — Auth utilities

**Purpose:** Handle user registration, login, OTP verification, and profile creation.

---

### 3. **Banks Module** (`src/modules/banks/`)
Manages bank account connections and integration.

**Files:**
- `components/`
  - `BankCard.tsx` — Display connected bank
  - `BankSelectorModal.tsx` — Bank selection modal
  - `ConnectBankCard.tsx` — Card to initiate bank connection
- `store/bankStore.ts` — Bank state management

**Purpose:** Handle bank account linking and management.

---

### 4. **Budget Module** (`src/modules/budget/`)
Manages budget creation and tracking.

**Files:**
- `components/BudgetCard.tsx` — Display budget
- `screens/BudgetScreen.tsx` — Budget management screen
- `store/budgetStore.ts` — Budget state management
- `types/` — Budget type definitions

**Purpose:** Create, track, and manage spending budgets.

---

### 5. **Categories Module** (`src/modules/categories/`)
Manages transaction categories.

**Files:**
- `category/components/CategoryCard.tsx` — Category display
- `category/types/` — Category type definitions

**Purpose:** Organize and manage transaction categories.

---

### 6. **Home Module** (`src/modules/home/`)
Main dashboard/home screen logic.

**Files:**
- `screens/DashboardScreen.tsx` — Dashboard screen

**Purpose:** Display home page with financial overview.

---

### 7. **Settings Module** (`src/modules/settings/`)
User settings and preferences.

**Files:**
- `screens/SettingsScreen.tsx` — Main settings screen

**Purpose:** Manage app settings and user preferences.

---

### 8. **Transactions Module** (`src/modules/transactions/`)
Handles transaction management.

**Files:**
- `components/TransactionCard.tsx` — Transaction display
- `screens/`
  - `AddTransactionScreen.tsx` — Add new transaction
  - `TransactionDetailScreen.tsx` — Transaction details
  - `TransactionsScreen.tsx` — Transaction list
- `store/transactionStore.ts` — Transaction state management

**Purpose:** Track, add, and manage financial transactions.

---

## Key Technologies

### Core Framework
- **React Native** 0.74.0 — Mobile framework
- **Expo** ~51.0.0 — Development and deployment platform
- **Expo Router** ~3.5.0 — Navigation
- **TypeScript** — Type safety

### State Management
- **Zustand/MobX** (via stores) — Global state management
- **React Query** (@tanstack/react-query) — Server state management

### UI & Styling
- **NativeWind** — Tailwind CSS for React Native
- **Tailwind CSS** — Utility-first CSS
- **Lucide React Native** — Icon library

### Forms & Validation
- **React Hook Form** — Form management
- **Zod** — Schema validation

### Storage
- **Expo Secure Store** — Secure credential storage
- **AsyncStorage** — Persistent key-value storage
- **MMKV** — High-performance storage

### Other Libraries
- **Supabase** — Backend-as-a-service
- **D3 Scale** — Data visualization
- **Victory Native** — Charts and graphs
- **Date-fns** — Date utilities
- **Expo Haptics** — Haptic feedback

---

## File Manifest

### Configuration Files
| File | Purpose |
|------|---------|
| [app.json](app.json) | Expo app configuration |
| [package.json](package.json) | Dependencies & npm scripts |
| [tsconfig.json](tsconfig.json) | TypeScript configuration |
| [tailwind.config.js](tailwind.config.js) | Tailwind CSS configuration |
| [.eslintrc.js](.eslintrc.js) | ESLint configuration |

### Documentation
| File | Purpose |
|------|---------|
| [README.md](README.md) | Project overview |
| [master.md](master.md) | Project orchestration guide |
| [docs/01-Project-Vision.md](docs/01-Project-Vision.md) | Vision & goals |
| [docs/02-Features.md](docs/02-Features.md) | Feature list |
| [docs/03-Screens.md](docs/03-Screens.md) | Screen specifications |
| [docs/04-Design-System.md](docs/04-Design-System.md) | Design guidelines |
| [docs/05-Roadmap.md](docs/05-Roadmap.md) | Development roadmap |
| [docs/06-Tech-Stack.md](docs/06-Tech-Stack.md) | Technology stack details |

### Source Files

#### Components (`src/components/ui/`)
| Component | Purpose |
|-----------|---------|
| Avatar.tsx | User avatar display |
| Badge.tsx | Badge UI element |
| Button.tsx | Reusable button |
| Card.tsx | Card container |
| Input.tsx | Text input field |
| ProgressBar.tsx | Progress indication |
| SplashScreen.tsx | Splash/loading screen |

#### Hooks (`src/hooks/`)
| Hook | Purpose |
|------|---------|
| useAuth.tsx | Authentication logic hook |

#### Stores (`src/stores/`)
| Store | Purpose |
|-------|---------|
| uiStore.ts | UI state management |
| bankStore.ts | Bank state (also in modules/banks) |
| authStore.ts | Auth state (also in modules/auth) |
| budgetStore.ts | Budget state (also in modules/budget) |
| transactionStore.ts | Transaction state (also in modules/transactions) |

#### Routes (`app/`)
| Route Group | Screens |
|------------|---------|
| (auth) | Authentication flow screens |
| (tabs) | Main tabbed interface screens |
| settings | Settings sub-screens |

---

## Development Scripts

```bash
npm start              # Start development server
npm run ios            # Build for iOS simulator
npm run android        # Build for Android emulator
npm run web            # Build for web
npm run typecheck      # TypeScript type checking
npm run lint           # Run ESLint
npm run test           # Run tests
npm run build:ios      # Build for iOS production
npm run build:android  # Build for Android production
```

---

## Key Patterns & Conventions

### Naming Conventions
- **Files:** camelCase for utilities, PascalCase for components
- **Components:** PascalCase with `.tsx` extension
- **Screens:** PascalCase with `Screen` suffix
- **Stores:** camelCase with `Store` suffix
- **Hooks:** camelCase with `use` prefix

### File Organization
- Feature-specific code lives in `modules/{feature}/`
- Shared components in `components/ui/`
- Global utilities in `utils/`
- Type definitions co-located with features

### State Management
- Global UI state in `stores/uiStore.ts`
- Feature-specific state in `modules/{feature}/store/`
- Server state via React Query

---

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development:**
   ```bash
   npm start
   ```

3. **Type checking:**
   ```bash
   npm run typecheck
   ```

4. **Linting:**
   ```bash
   npm run lint
   ```

---

## Project Status

- ✅ Core architecture established
- ✅ Module structure organized
- ✅ UI components created
- ✅ Authentication flow implemented
- ✅ Storage configured (AsyncStorage, Secure Store, MMKV)
- 🔄 State management being refined
- 🔄 Features in active development

---

## Notes for Developers

- Follow the Feature-Based Architecture strictly
- Keep reusable components in `src/components/`
- Feature-specific components belong in `src/modules/{feature}/`
- Import paths: Use feature-relative imports within modules, absolute imports from root
- Maintain TypeScript strict mode
- Use Tailwind utilities via NativeWind
- Validate all data with Zod schemas
- Handle errors gracefully with error boundaries

---

**Last Updated:** July 12, 2026  
**Maintained by:** Development Team
