# Envest Helper - Mutual Fund API

A REST API for mutual fund data management and retrieval. Provides endpoints for searching, filtering, and accessing mutual fund information.

**Base URL:** `http://localhost:3000/api/v1`

---

## 📋 **API Endpoints**

### **🔍 Search Funds**

```
GET /search?query={search_term}&limit={number}
```

Search mutual funds by name, fund house, or category.

**Example:** `/search?query=HDFC Equity&limit=10`

---

### **📊 Filter Funds**

```
GET /funds?category={category}&fund_house={amc}&fund_rating_gte={number}&fund_rating_lte={number}&limit={number}
```

Filter funds by various criteria like category, fund house, ratings, etc.

**Examples:**

- `/funds?category=Equity&fund_house=HDFC&limit=20`
- `/funds?fund_rating_gte=4&fund_rating_lte=5&limit=10`

---

### **🎯 Get Single Fund**

**By ISIN:**

```
GET /funds/isin/{isin_code}
```

**By Code:**

```
GET /funds/code/{fund_code}
```

**By Scheme Code:**

```
GET /funds/scheme_code/{scheme_code}
```

---

### **📂 Categories**

```
GET /categories
```

Get all available fund categories.

---

### **🏢 AMCs (Asset Management Companies)**

```
GET /amc
```

Get all fund houses with their fund counts and categories.

---

## 📁 **Project Structure**

```
src/
├── config/          # Database and app configuration
├── controllers/     # Request handlers and business logic
├── middlewares/     # Error handling and request processing
├── routes/          # API route definitions
├── services/        # External service integrations
└── utils/           # Helper functions and utilities
```

---

## 🛠️ **Tech Stack**

- **Framework:** Express.js
- **Database:** PostgreSQL with Prisma ORM
- **Language:** Node.js (ES6+ modules)

---

## 🤖 **Automation**

This project includes automated scripts for data management:

- **Daily NAV and returns updates**
- **Weekly fund details updates**
- **New fund discovery and synchronization**

📖 **[View Scripts Documentation →](scripts/README.md)**

---

## 📝 **Environment Variables**

```env
PORT=3000
DATABASE_URL=your_database_url
FRONTEND_URL=http://localhost:5173
```

## 🔧 **Scripts**

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
