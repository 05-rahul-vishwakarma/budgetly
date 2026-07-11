# Tech Stack

## Frontend
- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based)
- **State**: Zustand + React Query
- **Forms**: React Hook Form + Zod
- **UI**: Custom (Design System) + Lucide Icons
- **Charts**: Victory Native / Recharts
- **Animations**: Reanimated 3 / Moti

## Backend (BaaS)
- **Platform**: Supabase
- **Database**: PostgreSQL
- **Auth**: Supabase Auth (Phone/OTP)
- **Storage**: Supabase Storage
- **Realtime**: Supabase Realtime
- **Edge Functions**: Deno (for AI, webhooks)

## Banking Integration
- **Account Aggregator**: Setu / Sahamati / Perfios
- **SMS Parsing**: On-device (regex + ML)

## AI / ML
- **LLM**: OpenAI GPT-4o / Anthropic Claude
- **Embeddings**: OpenAI / Local (Transformers.js)
- **Categorization**: On-device TF.js / CoreML
- **Vector DB**: pgvector (Supabase)

## DevOps
- **CI/CD**: GitHub Actions + EAS Build
- **Monitoring**: Sentry + PostHog
- **Testing**: Jest + React Native Testing Library
- **E2E**: Detox

## Architecture
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Mobile    │────▶│  Supabase   │────▶│  Edge Funcs │
│  (Expo RN)  │     │  (Postgres) │     │  (AI/Logic) │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Secure     │     │  Realtime   │     │  Vector DB  │
│  Storage    │     │  Subscriptions     │  (pgvector) │
└─────────────┘     └─────────────┘     └─────────────┘
```

## Key Libraries
| Category | Libraries |
|----------|-----------|
| UI | `lucide-react-native`, `react-native-reanimated`, `react-native-gesture-handler` |
| Data | `@tanstack/react-query`, `zustand`, `@supabase/supabase-js` |
| Forms | `react-hook-form`, `@hookform/resolvers`, `zod` |
| Charts | `victory-native`, `d3-scale` |
| Utils | `date-fns`, `clsx`, `tailwind-merge` |

## Security
