# Venezuela Energy Monitor

A dashboard for tracking Venezuela's oil production and energy infrastructure using live data from the U.S. Energy Information Administration (EIA) API.

## Features

- Live oil production data from EIA API
- Historical production trends (1998-present)
- Refinery status tracking
- Industry news feed
- Responsive, minimal black/white UI

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- Recharts
- Vercel Edge Functions (API proxy)

## Development

```bash
# Install dependencies
npm install

# Run development server (uses fallback data)
npm run dev

# Run with live API (requires Vercel CLI)
npm run dev:api
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variable in Vercel dashboard:
   - `EIA_API_KEY`: Your EIA API key

The API key is stored server-side only and never exposed to the browser.

### Get an EIA API Key

1. Visit https://www.eia.gov/opendata/register.php
2. Register for a free API key
3. Add it to your Vercel environment variables

## Environment Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `EIA_API_KEY` | Server-side only | EIA API key for fetching production data |

## Project Structure

```
src/
  components/     # React components
  context/        # React context providers
  data/           # Static fallback data
  hooks/          # Custom React hooks
  services/       # API service layer
  types/          # TypeScript types
  utils/          # Utility functions
api/
  production.ts   # Vercel Edge Function (API proxy)
```

## License

MIT
