# Matching Service

This directory contains the Go service responsible for fast property-search matching.

The service exposes simple HTTP endpoints to manage searches, properties and to
retrieve potential swap cycles.

The matching logic demonstrates the binary encoding approach described in the
architecture notes and finds swap cycles of two to four participants.

## Running

```bash
# from repository root
go run ./matching-service/cmd
```

The server listens on port 8080 and supports the following endpoints:

- `POST /search`   – add or update a search entry
- `POST /property` – add or update a property entry
- `GET  /match`    – return swap cycles (2-4 users)

Run `go run ./matching-service/demo` to see a local example inserting sample
data and printing the found cycles.

## Docker

Build and run the service in a container:

```bash
# from repository root
docker compose up --build
```

The service will be available on `http://localhost:8080`.
