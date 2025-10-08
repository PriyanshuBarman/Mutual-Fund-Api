# Mutual Fund API

## A REST API for mutual fund data management and retrieval. Provides endpoints for searching, filtering, and accessing comprehensive mutual fund information.

## 📁 Project Structure

- `src/` — Main API source code (routes, controllers, services, utils)
- `scripts/` — Automation scripts for data updates and management
- `prisma/` — Database schema and migrations
- `config/` — Database configuration

---

## 📚 Available APIs

- [🔍 **Search API**](#-search-api) - Search funds by name, AMC, or category
- [🎯 **Single Fund Retrieval API**](#-single-fund-retrieval-api) - Get detailed fund information by ISIN, code, or scheme code
- [📊 **Filter & Browse API**](#-filter--browse-api) - Filter and sort funds with advanced options and pagination
- [🏢 **AMCs API**](#-amcs-api) - Get all fund houses with their rank, total funds managed by the AMC, and total AUM of the AMC
- [📂 **Categories API**](#-categories-api) - Get all fund categories & subcategories, and get fund's rank in category with fund returns vs category average returns (1Y, 3Y, 5Y)
- [👨‍💼 **Fund Manager API**](#-fund-manager-api) - Get all funds managed by specific fund managers

---

**Base URL:** `http://localhost:3000/api/v1/mutual-funds`

## 📚 API Endpoints

### 🔍 Search API

**Endpoint:** `GET /search`

Search for mutual funds by name, short name, AMC, or category.

**Query Parameters:**

- `query` (string, required): Search term (fund name, AMC name, category)
- `limit` (number, optional): Maximum results (default: 5)

**Example:**

```
GET /api/v1/mutual-funds/search?query=HDFC&limit=10
```

**Response:**

```json
{
  "success": true,
  "funds": [
    {
      "name": "HDFC Top 100 Fund - Growth",
      "short_name": "HDFC Top 100",
      "code": "HDFC_TOP_100_G",
      "scheme_code": 118551,
      "ISIN": "INF179K01177",
      "fund_category": "Large Cap",
      "detail_info": {...}
    }
  ]
}
```

---

### 🎯 Single Fund Retrieval API

Retrieve detailed fund information using different identifiers:

#### By ISIN

**Endpoint:** `GET /isin/{isin_code}`

#### By Internal Code

**Endpoint:** `GET /code/{fund_code}`

#### By Scheme Code

**Endpoint:** `GET /scheme_code/{scheme_code}`

**Example:**

```
GET /api/v1/mutual-funds/isin/INF179K01177
GET /api/v1/mutual-funds/code/internalCode
GET /api/v1/mutual-funds/scheme_code/118551
```

**Response:**

```json
{
  "success": true,
  "fund": {
    "name": "HDFC Top 100 Fund - Growth",
    "scheme_code": 118551,
    "ISIN": "INF179K01177",
    "fund_rating": 4,
    "return_1y": 15.5,
    "return_3y": 12.8,
    "expense_ratio": 1.25,
    "aum": 12500000000
    // ... complete fund details with comparison data
  }
}
```

---

### 📊 Filter & Browse API

**Endpoint:** `GET /`

Filter and browse mutual funds with advanced filtering options and sorting.

**Query Parameters:**

- `category` (string): Fund category (e.g., "Large Cap", "Mid Cap")
- `amc_name` (string): AMC name (e.g., "HDFC Mutual Fund")
- `fund_rating_gte` (number): Minimum fund rating
- `fund_rating_lte` (number): Maximum fund rating
- `sort_by` (string): Sort field (default: "popularity")
- `order_by` (string): Sort order - "asc" or "desc" (default: "desc")
- `limit` (number): Maximum results
- `offset` (number): Results offset for pagination

**Example:**

```
GET /api/v1/mutual-funds?category=Large Cap&amc_name=HDFC Mutual Fund&limit=20&sort_by=return_3y
```

**Response:**

```json
{
  "success": true,
  "count": 15,
  "totalCount": 45,
  "hasMore": true,
  "funds": [...]
}
```

---

### 🏢 AMCs API

#### Get All AMCs

**Endpoint:** `GET /amcs`

Get ranked list of all Asset Management Companies with fund counts and total AUM, ordered by total AUM (highest to lowest).

**Response:**

```json
{
  "success": true,
  "count": 45,
  "amcs": [
    {
      "rank": 1,
      "amc_code": "HDFC",
      "amc_name": "HDFC Mutual Fund",
      "detail_info": {...},
      "totalAUM": 450000000000,
      "fundCount": 89
    },
    {
      "rank": 2,
      "amc_code": "ICICI",
      "amc_name": "ICICI Prudential Mutual Fund",
      "detail_info": {...},
      "totalAUM": 425000000000,
      "fundCount": 76
    }
  ]
}
```

#### Get AMC Funds

**Endpoint:** `GET /amcs/{amc_code}`

Get all funds managed by a specific AMC, grouped by fund type.

**Example:**

```
GET /api/v1/mutual-funds/amcs/HDFC
```

**Response:**

```json
{
  "success": true,
  "count": 89,
  "categories": {
    "Equity": [...],
    "Debt": [...],
    "Hybrid": [...]
  }
}
```

---

### 📂 Categories API

#### Get All Categories

**Endpoint:** `GET /categories`

Get all available fund types and their categories (categories & subcategories).

**Response:**

```json
{
  "success": true,
  "result": [
    {
      "fund_type": "Equity",
      "fund_categories": "Large Cap,Mid Cap,Small Cap,Multi Cap"
    }
  ]
}
```

#### Get Fund Category Performance

**Endpoint:** `GET /categories/{scheme_code}`

Get fund's performance ranking within its category and category avg returns.

**Response:**

```json
{
  "success": true,
  "returns": {
    "1Y": 15.5,
    "3Y": 12.8,
    "5Y": 14.2,
    "ALL": 16.1
  },
  "category_average": {
    "1Y": 13.2,
    "3Y": 11.5,
    "5Y": 12.9
  },
  "rank_in_category": {
    "1Y": 45,
    "3Y": 32,
    "5Y": 28
  }
}
```

---

### 👨‍💼 Fund Manager API

**Endpoint:** `GET /fund-managers/{manager_name}`

Get all funds managed by a specific fund manager.

**Example:**

```
GET /api/v1/mutual-funds/fund-managers/Prashant Jain
```

**Response:**

```json
{
  "success": true,
  "funds": [...]
}
```

---

## 🤖 Automation

This project includes automated scripts to ensure mutual fund database stays updated and accurate:

- **Daily NAV and returns updates**
- **Weekly fund details updates**
- **New fund discovery and synchronization**

📖 **[View Scripts Documentation →](scripts/README.md)**

---

## 📝 Environment Variables

```env
PORT=3000
DATABASE_URL=your_database_url
FRONTEND_URL=http://localhost:5173
```

---

## 🔧 Scripts

```bash
# Start development server
npm run dev

# Start production server
npm start

# Update fund data
npm run dailyupdater
npm run weeklyupdater
npm run syncnewfunds
```

---
