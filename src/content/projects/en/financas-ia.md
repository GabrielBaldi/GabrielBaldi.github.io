---
title: AI Expense Tracker
summary: Imports bank statements and categorizes spending in layers, rules first and AI only for what's left. Expenses also arrive through Telegram and are matched with the statement later, without duplicates.
year: 2026
status: done
role: Back-end and AI
stack: [Python, FastAPI, SQLAlchemy, Alembic, Pytest, Claude API, NVIDIA NIM, Telegram Bot API, React, TypeScript]
repoName: financas-ia
cover: ../covers/financas-ia.png
coverAlt: Monthly dashboard with spending by category and income versus spending over the last six months
order: 2
---

## Problem

Tracking expenses in a spreadsheet is tedious, and most people give up by the second month. The boring part is labeling every line of the statement, especially with descriptions like `MP *LOJADOZE` or `DROGARIAPACHECO`. And day-to-day spending (lunch, an Uber ride) only shows up on the statement days later.

## Solution

Imports go through a layered pipeline, and each transaction records which layer decided:

1. **User rules**: created from the user's own corrections.
2. **Built-in rules**: keywords for Brazilian merchants and terms (iFood, Uber, Pix, supermarkets, pharmacies...).
3. **AI**: whatever is left goes **in a single request** to Claude or to a model on NVIDIA's API (configurable), with a JSON schema response and a closed list of categories.
4. **To review**: invalid response, confidence below 0.7, network error or AI turned off.

On the review screen, fixing a category suggests a rule and shows how many similar transactions it covers. It reads Brazilian bank OFX files (SGML with unclosed tags, in Latin-1), Nubank CSV and a generic CSV, and re-importing the same statement never duplicates anything.

## Logging expenses from the phone

A personal Telegram bot takes messages like `32,90 almoço` or `uber 23 ontem` and creates the entry through the same categorization pipeline.

- **No open port:** the computer polls Telegram (long polling), so nothing is exposed to the internet.
- **Owner only:** the chat is linked with a single-use code generated in the app, valid for 10 minutes; 5 wrong codes lock the chat for 15 minutes.
- **No duplicates:** when the statement arrives, a Telegram entry and a bank row with the same account, same amount and at most 3 days apart become one transaction. The bank's description stays, and the user's text becomes a note. It works in both directions.

## How accurate it is

Measured on 102 hand-labeled fictional transactions, a quarter of them deliberately hard. The AI is MiniMax M3.1 Flash on NVIDIA's API, over two runs:

| Metric | Rules only | Rules + AI |
| --- | --- | --- |
| Coverage (got a category) | 78.4% | 99.0% to 100% |
| Overall accuracy ("to review" counts as wrong) | 76.5% | 97.1% to 98.0% |
| AI decisions right | — | 21 of 21 and 22 of 22 |

The two remaining errors come from keyword rules, not from the AI. These numbers are likely optimistic, since the same person wrote the rules and the test set, and 22 transactions for the AI is a small sample.

## Responsible AI

- **Predictable cost:** the AI only sees what the rules can't handle, all in one call.
- **Never makes up a category:** the response is validated item by item with Pydantic; a bad item goes to review without breaking the batch.
- **Privacy:** only each transaction's id, description and amount leave the server.
- **Prompt injection:** the prompt treats descriptions as statement data, never as instructions.
- **Fails safely:** if the provider is slow or down, the batch goes to review; without a key, the app runs on rules only.

## Technical decisions

| Decision | Alternative | Why |
| --- | --- | --- |
| AI only for what the rules can't solve | Send everything to the AI | Cost and predictability: 78% is solved without AI. |
| Classifier behind a `Protocol` | Code tied to one provider | Adding NVIDIA next to Claude was a new implementation, with no pipeline changes; tests plug in a fake. |
| OpenAI-compatible API through `httpx2` | A second SDK | The HTTP library was already there; the same prompt, schema and validation serve both providers. |
| Bot with long polling | Webhook | Runs on a home computer with no open port and no domain. |
| Reconciliation by account, amount and date (±3 days) | Flagging duplicates by hand | The quick phone entry and the bank statement find each other automatically. |
| Foreign keys off during the SQLite migration | Default migration | In SQLite, rebuilding the users table would cascade-delete accounts and transactions; a control run caught it before production. |

## Quality

- 271 pytest tests with 99% coverage: parsers, every pipeline layer, both AI providers against fake servers, the bot against a fake Telegram API, reconciliation and the migration on a populated database.
- ruff and strict mypy with zero warnings; React front-end with strict TypeScript and 19 Vitest tests, all on GitHub Actions.

## Next steps

- Measure rules + AI on a real statement and publish the numbers.
- Run the bot as a Windows service, without the app window open.
- Account filter on the review screen and rule editing.
- Postgres and end-to-end tests in CI.
