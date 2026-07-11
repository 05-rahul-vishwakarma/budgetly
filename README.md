# AI Financial Copilot

A modern, intelligent financial management app built with React Native (Expo) and Supabase.

---

## Documentation

| File | Description |
|------|-------------|
| [docs/01-Project-Vision.md](docs/01-Project-Vision.md) | Mission, values, target audience |
| [docs/02-Features.md](docs/02-Features.md) | Complete feature list (MVP + AI + Future) |
| [docs/03-Screens.md](docs/03-Screens.md) | All 23 screens with descriptions |
| [docs/04-Design-System.md](docs/04-Design-System.md) | Colors, typography, components, tokens |
| [docs/05-Roadmap.md](docs/05-Roadmap.md) | Phased timeline with milestones |
| [docs/06-Tech-Stack.md](docs/06-Tech-Stack.md) | Architecture, libraries, services |

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run on iOS
npm run ios

# Run on Android
npm run android
```

---

## Project Structure

```
AI-Financial-Copilot/
├── app/                    # Expo Router pages
│   ├── (auth)/            # Auth flow screens
│   ├── (tabs)/            # Main tab navigation
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities, config, clients
├── store/                 # Zustand stores
├── types/                 # TypeScript types
├── constants/             # App constants
└── assets/                # Fonts, images, icons
```

---

## Tech Stack

- **Frontend**: React Native + Expo + TypeScript
- **Backend**: Supabase (PostgreSQL, Auth, Realtime, Storage, Edge Functions)
- **Banking**: Account Aggregator (Setu/Sahamati)
- **AI**: OpenAI / Anthropic + pgvector
- **Charts**: Victory Native
- **State**: Zustand + TanStack Query

---

## License

MIT
# budgetly
