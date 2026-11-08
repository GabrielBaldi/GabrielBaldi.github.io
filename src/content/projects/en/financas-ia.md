---
title: AI Expense Tracker
summary: Imports bank statements (OFX or CSV) and categorizes spending in layers, rules first and AI only for what's left. Every transaction shows who decided its category, and every correction becomes a rule.
year: 2026
status: done
role: Back-end and AI
stack: [Python, FastAPI, SQLAlchemy, Alembic, Pytest, Claude API, React, TypeScript, Docker]
repoName: financas-ia
cover: ../covers/financas-ia.png
coverAlt: Monthly dashboard with spending by category and income versus spending over the last six months
order: 2
---

## Problem

Tracking expenses in a spreadsheet is tedious, and most people give up by the second month. The boring part is labeling every line of the statement, especially with descriptions like `MP *LOJADOZE` or `DROGARIAPACHECO`.

## Solution

Imports go through a layered pipeline, and each transaction records which layer decided:

1. **User rules**: created from the user's own corrections.
2. **Built-in rules**: keywords for Brazilian merchants and terms (iFood, Uber, Pix, supermarkets, pharmacies...).
3. **AI**: whatever is left goes to Claude **in a single request**, with a JSON schema response and a closed list of categories.
4. **To review**: invalid response, confidence below 0.7, network error or AI turned off.

On the review screen, fixing a category suggests a rule and shows how many similar transactions it covers. The dashboard shows spending by category and the last six months.

It also reads Brazilian bank OFX files (SGML with unclosed tags, in Latin-1), Nubank CSV and a generic CSV, detecting the format automatically. Re-importing the same statement never duplicates anything.

## How well the rules do

I measured the rules-only pipeline on 102 hand-labeled fictional transactions, a quarter of them deliberately hard:

| Metric | Result |
| --- | --- |
| Coverage (got a category) | 78.4% |
| Accuracy on categorized | 97.5% |
| Overall accuracy ("to review" counts as wrong) | 76.5% |

These numbers are likely optimistic, since the same person wrote the rules and the test set. The remaining 22% is exactly the AI's job. The same script measures rules + AI when an API key is configured.

## Responsible AI

- **Predictable cost:** the AI only sees what the rules can't handle, all in one call. The estimate is under US$0.001 per statement with Claude Haiku.
- **Never makes up a category:** the response is validated item by item with Pydantic. A bad item goes to review without breaking the batch.
- **Privacy:** only each transaction's id, description and amount leave the server.
- **Prompt injection:** the prompt treats descriptions as statement data, never as instructions.
- **Works without a key:** without an API key the app runs on rules only and says so on screen.

## Technical decisions

| Decision | Alternative | Why |
| --- | --- | --- |
| AI only for what the rules can't solve | Send everything to the AI | Cost and predictability: 78% is solved without AI. |
| Classifier behind a `Protocol`, with a fake in tests | Calling the API in tests | Fast, deterministic and free tests. |
| Amounts as integer cents | `float` or `Decimal` | No rounding errors, same column type in SQLite and Postgres. |
| Opaque token stored only as a hash | JWT | Logout truly revokes, and there is no signing secret to leak. |
| Custom OFX parser | `ofxparse` or `ofxtools` | Brazilian bank OFX is often SGML with unclosed tags. |
| SQLite locally, Postgres in production | Postgres everywhere | Anyone can clone and run without installing a database; a test checks migrations match the models. |

## Quality

- 92 pytest tests with 96% coverage: parsers, every pipeline layer, AI response validation, API routes and user isolation.
- ruff and mypy in strict mode with zero warnings.
- React front-end with strict TypeScript and Vitest tests, all running on GitHub Actions.

## Next steps

- Measure rules + AI on a real statement and publish the numbers.
- Account filter on the review screen and rule editing.
- Login rate limiting.
- Postgres and end-to-end tests in CI.
