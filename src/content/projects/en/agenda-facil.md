---
title: Agenda Fácil
summary: Online booking for barbershops, salons and studios. Customers book through a link, the team follows the schedule on a dashboard, and the database guarantees two bookings never overlap.
year: 2026
status: done
role: Full-stack
stack: [TypeScript, Next.js, React, PostgreSQL, Drizzle, Better Auth, Vitest, Playwright, GitHub Actions]
repoName: agenda-facil
cover: ../covers/agenda-facil.png
coverAlt: Owner's daily schedule with one column per staff member, lunch blocks, and revenue and occupancy stats
order: 1
---

## Problem

Many small businesses still book appointments over WhatsApp. The owner spends the day answering messages, sometimes books two people for the same slot, and customers forget their appointments.

## Solution

- **A public page per business:** the customer picks a service, a professional (or "anyone"), a day and a free slot, and confirms in a few taps.
- **Free slots computed on the server:** opening hours minus bookings and blocks, in 15-minute steps, never in the past.
- **Dashboard with login:** a daily schedule with one column per professional, plus a weekly view. It shows expected revenue and occupancy, and handles cancellations, blocks (lunch, days off), services, hours and team.
- **Roles:** the owner sees everything, while staff see and change only their own schedule. The rule is enforced on the server, on every page and action.
- **Reminder 24 h before:** written to an outbox in the same transaction as the booking and sent by a cron job.
- **Demo data included:** "Barbearia Navalha de Ouro", a fictional barbershop with three professionals and a week of bookings.

## Double booking is impossible

The product's most important rule lives in the database, not only in code:

```sql
ALTER TABLE bookings ADD CONSTRAINT bookings_no_overlap
  EXCLUDE USING gist (staff_id WITH =, tstzrange(starts_at, ends_at, '[)') WITH &&)
  WHERE (status <> 'cancelled');
```

If two customers confirm the same slot at the same time, PostgreSQL accepts one and rejects the other (error `23P01`). The app turns that into "Esse horário acabou de ser reservado. Escolha outro." ("This slot was just taken. Pick another one."), and if the customer chose "anyone", it tries the next free professional. A test fires two simultaneous requests and checks that exactly one booking is created.

## Technical decisions

| Decision | Alternative | Why |
| --- | --- | --- |
| Exclusion constraint in PostgreSQL | Overlap check in code only | The rule holds for every path that writes to the database, including concurrent requests and future bugs. |
| PGlite (Postgres in WASM) locally and in tests, Neon in production | Docker Compose with Postgres | Anyone can clone and run without Docker, and integration tests exercise the same SQL and constraint. |
| Better Auth with Drizzle | Auth.js Credentials | Revocable sessions in the database, password hashing and login rate limiting built in. |
| Drizzle ORM | Prisma | Queries that read like SQL, plus a hand-written migration for the constraint. |
| URL-driven booking flow | Client-side wizard | Works without JavaScript, and the server recomputes slots at every step. |
| Reminder outbox inside the booking transaction | Send the email immediately | If the email provider is down nothing is lost, and two concurrent crons never send the same reminder twice. |

## Quality

- 37 Vitest tests: slot computation (São Paulo time zone, blocks, past times), database integration and reminders.
- 4 Playwright end-to-end tests: a customer books, the owner sees it on the schedule, two customers race for the same slot, and staff only see their own schedule.
- ESLint, Prettier and strict TypeScript, all running on GitHub Actions.

## Next steps

- Per-professional opening hours.
- Let customers cancel or reschedule from the email link.
- WhatsApp reminders.
- Move blocks inside the database guarantee (today the app checks them).
- Ship it for a real business and measure bookings per week.
