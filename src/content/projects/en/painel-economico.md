---
title: Brazil Economy Dashboard
summary: Brazil's policy rate, inflation, USD/BRL and unemployment in one dashboard, built on Central Bank and IBGE open data. A Go API caches and normalizes the series, and every chart can be shared by link.
year: 2026
status: done
role: Full-stack
stack: [Go, React, TypeScript, Vite, SVG, Vitest, GitHub Actions, Docker]
repoName: painel-economico
cover: ../covers/painel-economico.png
coverAlt: Dashboard comparing the Selic rate with 12-month IPCA inflation over the last 10 years
order: 3
---

## Problem

Brazil's economic data is public but hard to use. The Selic rate is SGS series 432, the dollar is series 1, and unemployment lives in SIDRA table 6381 with rolling-quarter periods. Each API has its own format and limits, and both are sometimes slow or down. Someone who just wants to see inflation next to interest rates usually gives up.

## Solution

- **A Go API** merges both sources into one format (`{date, value}`), with an in-memory cache, retries with exponential backoff and jitter, and deduplication of concurrent fetches (singleflight).
- **When a source fails**, the API returns the last good copy flagged `stale: true`, and the UI shows how old the data is instead of an error.
- **Compare two indicators:** if they share a unit they share an axis; otherwise each gets its own panel, stacked over the same time axis.
- **The whole view lives in the URL**, so any chart becomes a shareable link.
- **Accessible:** the chart is keyboard-navigable with each point announced, and a table view shows the same data.
- **A single binary:** the React front-end is embedded in the Go server with `embed`.

## What I found in the APIs

Testing the sources before coding changed the design:

- SGS **rejects queries longer than 10 years** on daily series (it answers `406`). The API splits the range into 10-year windows and fetches them concurrently.
- A range with no data comes back as `404`, which the API treats as an empty list.
- The Selic series already contains **future dates** (the target holds until the next central bank meeting), so fetching stops at today.
- In SIDRA, missing values arrive as symbols (`-`, `..`, `X`) and are skipped.

## Technical decisions

| Decision | Alternative | Why |
| --- | --- | --- |
| Stacked panels for different units | Dual Y axis or base-100 index | A dual axis creates crossings that don't exist. Base 100 makes no sense for rates, and 4 of 5 indicators are rates. |
| Cache each full history and slice per request | One entry per period | Only 5 keys, and each series hits the source at most once an hour. |
| In-memory cache behind an interface | Redis from day one | With a single instance Redis is one more service for no gain. The interface allows swapping it later. |
| Official 12-month IPCA series (SGS 13522) | Compute it from monthly IPCA | Multiplying the rounded monthly rates gives 4.576% vs. the official 4.58%. |
| Hand-rolled SVG chart | uPlot or Recharts | Full control over accessibility and theming, with no chart dependency. |
| Standard library `net/http` | Gin or Echo | Three routes; since Go 1.22 the standard router handles methods and path parameters. |

## Quality

- 94 Go test cases with fake upstreams (`httptest`) instead of BCB and IBGE: parsers, 10-year windows, retries, cache, stale data and routes.
- 83 Vitest tests on the front-end: URL state, data transforms and chart geometry.
- gofmt, go vet, staticcheck, strict ESLint with accessibility rules and Prettier, all running on GitHub Actions.

## Next steps

- Redis, once there is more than one instance.
- Serve the expired copy right away and refresh in the background (stale-while-revalidate).
- More indicators: IGP-M, CDI and real interest rate.
- End-to-end tests with Playwright in CI.
