# Automation Scripts

This folder contains automation scripts for maintaining and updating the mutual fund database.  
**Scripts are optimized with batching, parallel processing, and robust error handling for reliability and efficiency.**

---

## 📂 Folder Structure

- `dailyUpdater/` — Updates NAV and returns for all funds (runs in batches)
- `weeklyUpdater/` — Updates comprehensive fund details (runs in batches)
- `syncNewFunds/` — Discovers and adds new mutual funds to the database

- `config/` — Shared configuration and database connection
- `test/` — Experimental and utility scripts

---

## 🔄 **Daily Updater** (`/dailyUpdater`)

**Purpose:**  
Updates NAV (Net Asset Value) and returns data for all funds.

**How it works:**

- Fetches latest NAV data from MF API for all funds in the database.
- Calculates performance returns for multiple time periods (1m, 6m, 1y, 3y, 5y, since inception).
- Updates the database with new NAV and calculated returns.
- **Processes funds in parallel batches** (using `p-limit` for concurrency control).
- Skips funds that already have current day's data.

**Key files:**

- `index.js` — Main orchestrator script (with batching)
- `services/getAllFunds.js` — Retrieves funds needing updates
- `services/updateNavAndReturns.js` — Updates NAV and returns in the database
- `utils/` — Helper functions for calculations and date parsing

---

## 📊 **Weekly Updater** (`/weeklyUpdater`)

**Purpose:**  
Updates comprehensive fund details that change weekly or monthly.

**How it works:**

- Fetches detailed fund information from external APIs.
- Updates fund metadata (expense ratios, ratings, limits, manager info, AUM, feature flags, etc.).
- **Processes funds in batches** (parallel API calls per batch, then waits before next batch).
- Batching and delay between batches help avoid API rate limits and database connection issues.
- Logs summary of updated and failed funds.

**Key files:**

- `index.js` — Main script with batching and delay logic
- `services/fetchFullFundData.js` — Fetches detailed fund data from API
- `services/updateFundData.js` — Updates fund data in the database
- `utils/dataMapper.js` — Maps API responses to database schema

---

## 🆕 **Sync New Funds** (`/syncNewFunds`)

**Purpose:**  
Discovers and adds newly launched mutual funds to the database.

**How it works:**

- Fetches the complete fund list from MF API.
- Identifies new funds not present in the database or blacklist.
- Validates new funds through multi-step verification:
  - NAV matching across different data sources
  - ISIN code validation
  - Fund details verification
- Adds verified new funds to the database.
- Maintains a blacklist of invalid/problematic funds.
- **Uses batching and concurrency control** for efficient processing.

**Key files:**

- `index.js` — Main synchronization orchestrator (with batching)
- `services/processSingleFund.js` — Individual fund processing pipeline
- `services/blacklistService.js` — Manages invalid fund tracking
- `services/insertFundToDatabase.js` — Inserts new funds into the database
- `utils/` — Utilities for validation, API calls, and matching

---

## ⚙️ **Config** (`/config`)

- `db.js` — Prisma database client setup and export

---

## 🧪 **Test** (`/test`)

- Contains experimental scripts and utilities for development and debugging.

---

## 🚀 **Running Scripts**

```bash
# Update NAV and returns for all funds (daily)
npm run dailyupdater

# Update comprehensive fund details (weekly)
npm run weeklyupdater

# Sync new funds to database (weekly or as needed)
npm run syncnewfunds
```

---

_These scripts ensure mutual fund database stays updated and accurate._
