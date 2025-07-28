# FlatSwaps

FlatSwaps is a demo project for swapping flats between users. It contains a Next.js
front‑end and a small Go service that matches search requests with available
properties.

## Directory structure

- `src` – Next.js application used for the UI
- `matching-service` – Go service implementing the matching logic
  - `cmd` – HTTP server
  - `demo` – console demo inserting sample data
  - `service` – matching library used by both the server and the demo

## Getting started

### Front‑end

```bash
npm install
npm run dev
```

Open <http://localhost:3000> to view the app.

### Matching service

Run the Go service on port `8080`:

```bash
go run ./matching-service/cmd
```

The service exposes `/search`, `/property` and `/match` endpoints.

### Demo

To see the matching logic in action run:

```bash
go run ./matching-service/demo
```

### Tests

```bash
cd matching-service
go test ./...
```

## Matching overview

Searches and properties are stored in memory. The service looks for swap cycles
between two to four users. When a participant rejects a match the pair is
blacklisted for 14 days to prevent it from being suggested again immediately.
