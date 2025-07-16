# Envest Helper - Automation Scripts

This folder contains automation scripts for maintaining and updating the mutual fund database. Each script handles specific data management tasks to keep the system current and accurate.

---

## 🔄 **Daily Updater** (`/dailyUpdater`)

**Purpose:** Updates NAV (Net Asset Value) and returns data for existing funds.

**Runs:** Daily

**What it does:**

- Fetches latest NAV data from MF API for all funds in database
- Calculates performance returns for multiple time periods:
  - 1 month, 6 months, 1 year, 3 years, 5 years
  - Since inception returns
- Updates database with new NAV and calculated returns
- Skips funds that already have current day's data

**Key files:**

- `index.js` - Main orchestrator script
- `services/getAllFunds.js` - Retrieves funds needing updates
- `utils/calculateReturns.js` - Calculates fund performance metrics
- `utils/getNavNDaysAgo.js` - Historical NAV lookup utility

---

## 📊 **Weekly Updater** (`/weeklyUpdater`)

**Purpose:** Updates comprehensive fund details that change weekly or monthly (non-daily data).

**Runs:** Weekly

**What it does:**

- Fetches detailed fund information from external APIs
- Updates fund metadata including:
  - Expense ratios and dates
  - Fund ratings and rating dates
  - Investment limits (minimum/maximum amounts)
  - Fund manager information
  - AUM (Assets Under Management)
  - Feature flags (SIP/lump sum availability)
- Processes funds one by one sequentially
- Skips already updated funds to resume capability

**Key files:**

- `index.js` - Main script with sequential processing
- `services/fetchFullFundData.js` - External API data retrieval
- `services/updateDatabase.js` - Database update operations
- `utils/dataMapper.js` - Maps API responses to database schema

---

## 🆕 **Sync New Funds** (`/syncNewFunds`)

**Purpose:** Discovers and adds newly launched mutual funds to the database.

**Runs:** Weekly

**What it does:**

- Fetches complete fund list from MF API
- Identifies new funds not present in database
- Validates new funds through multi-step verification:
  - NAV matching across different data sources
  - ISIN code validation
  - Fund details verification
- Adds verified new funds to database
- Maintains blacklist of invalid/problematic funds

**Key files:**

- `index.js` - Main synchronization orchestrator
- `services/processSingleFund.js` - Individual fund processing pipeline
- `services/blacklistService.js` - Manages invalid fund tracking
- `utils/fetchNewFunds.js` - Identifies funds to process
- `utils/findNAVMatch.js` - Cross-reference validation
- `utils/validateISIN.js` - ISIN code verification

---

## ⚙️ **Config** (`/config`)

**Purpose:** Shared configuration and database connections.

**Contains:**

- `db.js` - Prisma database client setup
- Environment variable configurations
- API endpoint constants

---

## 🚀 **Running Scripts**

```bash
# Update NAV and returns for all funds
npm run dailyupdater

# Update comprehensive fund details
npm run weeklyupdater

# Sync new funds to database
npm run syncnewfunds
```

---

## 📋 **Script Workflow**

```
1. Sync New Funds     → Discovers and adds new mutual funds
2. Weekly Updater     → Updates comprehensive fund details
3. Daily Updater      → Updates NAV and performance data
```

---

_This automation system ensures mutual fund database stays current and accurate with minimal manual oversight._
