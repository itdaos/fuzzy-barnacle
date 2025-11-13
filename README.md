# Star Wars Character Roster

A modern React-based single-page application that displays Star Wars characters with paginated browsing, list/grid views, and interactive character detail pages featuring relationship graphs.

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Clone repository
git clone <repo-url>
cd startwars-roster-demo

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The app will open at `http://localhost:5173/`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

## Scripts

```bash
npm run dev         # Start dev server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
npm test            # Run Jest tests
npm test -- --watch # Tests in watch mode
```

## Project Structure

```
src/
├── pages/
│   ├── CharactersPage.tsx       # Character list page (controller)
│   └── CharacterDetailPage.tsx  # Detail page with graph
├── components/                  # Decomposed UI components
│   ├── CharacterCard.tsx        # List view card
│   ├── CharacterGridCard.tsx    # Grid view card
│   ├── ViewToggle.tsx           # View mode switcher
│   ├── Pagination.tsx           # Page navigation
│   ├── CharacterInfo.tsx        # Character details display
│   ├── CharacterFilms.tsx       # Films section
│   ├── CharacterStarships.tsx   # Starships section
│   └── CharacterGraph.tsx       # React Flow graph
├── services/
│   └── api.ts                   # API layer & types
├── __tests__/                   # Jest unit tests
└── App.tsx                      # Main app with routing
```

## API Integration

Uses the free **Star Wars API** (https://sw-api.starnavi.io/):
- `/people/` - Characters
- `/films/` - Films
- `/starships/` - Starships

Rate limiting implemented to prevent 429 errors (sequential requests with 150ms delays).

## Testing

22 comprehensive unit tests covering:
- API service functions
- Component rendering
- User interactions
- Error handling

```bash
npm test                    # Run all tests
npm test -- --watch        # Watch mode
npm test -- --coverage     # Coverage report
```

