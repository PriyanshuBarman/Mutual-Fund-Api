## A REST API for mutual fund data management and retrieval. Provides endpoints for searching, filtering, and accessing mutual fund information.



## 📁 Project Structure

- `src/` — Main API source code (routes, controllers, services, etc.)
- `scripts/` — Automation scripts for data updates and management

---

## 📚 APIs

- [🔍 Search API](#-search-api)
- [📊 Filter API](#-filter-api)
- [🏢 AMCs API](#-amcs-api)
- [📂 Categories API](#-categories-api)
- [🎯 Single Fund API](#-single-fund-api)

**Base URL:** `http://localhost:3000/api/v1`

---

## 🔍 Search API

**Endpoint:**  
`GET /mutual-funds/search?query={search_term}&limit={number}`

**Description:**  
Search for mutual funds by name, AMC, or category.

**Parameters:**

- `query` (string, required): Search term (e.g., fund name, AMC, or category)
- `limit` (number, optional): Maximum number of results (default: 5)

**Example:**  
`/mutual-funds/search?query=HDFC&limit=10`

---

## 📊 Filter API

**Endpoint:**  
`GET /mutual-funds?category={category}&amc_name={amc}&fund_rating_gte={min}&fund_rating_lte={max}&limit={number}`

**Description:**  
Filter funds by category, AMC, rating, and more.

**Parameters:**

- `category` (string, optional): Fund category (e.g., Equity)
- `amc_name` (string, optional): AMC name (e.g., HDFC Mutual Fund)
- `fund_rating_gte` (number, optional): Minimum fund rating
- `fund_rating_lte` (number, optional): Maximum fund rating
- `limit` (number, optional): Maximum number of results

**Example:**  
`/mutual-funds?category=Equity&amc_name=HDFC Mutual Fund&limit=20`

---

## 🏢 AMCs API

**Endpoint:**  
`GET /mutual-funds/amcs`

**Description:**  
Get a list of all Asset Management Companies (AMCs) with their fund counts and categories.

---

## 📂 Categories API

**Endpoint:**  
`GET /mutual-funds/categories`

**Description:**  
Get a list of all available fund categories and their subcategories.

---

## 🎯 Single Fund API

**By ISIN:**  
`GET /mutual-funds/isin/{isin_code}`

**By Code:**  
`GET /mutual-funds/code/{fund_code}`

**By Scheme Code:**  
`GET /mutual-funds/scheme_code/{scheme_code}`

**Description:**  
Retrieve detailed information for a single fund using ISIN, internal code, or scheme code.

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
