# AI-KIVUN

Fullstack CRUD project instructions for managing MongoDB data in the `kivun_ai` database:
- `users` collection
- `products` collection
- user `purchases` array that references `products.id`

---

## 1) Goal
Build a fullstack application that supports complete CRUD operations for users and products, including assignment/removal of purchased product IDs per user.

The app must allow you to:
1. Create, read, update, delete users
2. Create, read, update, delete products
3. Manage user purchases (array of product IDs)
4. View a joined user→products table

---

## 2) Recommended Tech Stack
- **Frontend**: React + Vite + TypeScript
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Validation**: Zod or Joi
- **Styling**: Tailwind CSS (optional)
- **Testing**: Jest + Supertest (backend), Vitest/RTL (frontend)

You can use another stack if you keep the same feature scope.

---

## 3) Project Structure

```txt
AI-KIVUN/
  backend/
    src/
      app.ts
      server.ts
      config/
      db/
      models/
      routes/
      controllers/
      services/
      middleware/
      validators/
    package.json
    .env.example
  frontend/
    src/
      pages/
      components/
      services/
      hooks/
      types/
    package.json
  README.md
```

---

## 4) Data Model Requirements

### products
```json
{
  "id": 1,
  "title": "Product name",
  "price": 109.95,
  "description": "...",
  "category": "electronics",
  "image": "https://...",
  "rating": { "rate": 4.1, "count": 259 }
}
```

### users
```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "phone": "...",
  "website": "...",
  "address": { "street": "...", "city": "..." },
  "company": { "name": "..." },
  "purchases": [1, 2, 3]
}
```

Rules:
- `users.purchases` contains valid `products.id` values
- on create/update user, enforce at least 3 product IDs
- reject duplicate IDs in `purchases`

---

## 5) Backend API (CRUD + Join)

Base URL: `/api`

### Users
- `GET /users` → list users
- `GET /users/:id` → single user by numeric `id`
- `POST /users` → create user
- `PUT /users/:id` → replace/update user
- `PATCH /users/:id/purchases` → update only purchases
- `DELETE /users/:id` → delete user

### Products
- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

### Join / Reporting
- `GET /reports/users-products`
  - Return each user with expanded product objects from `purchases`
  - Implement with MongoDB aggregation `$lookup`

---

## 6) Validation & Error Handling

Implement request validation for all write routes:
- `id` is required numeric value
- `email` must be valid format
- `price` must be non-negative
- `purchases` must contain at least 3 unique product IDs
- all purchase IDs must exist in `products`

Use consistent error format:
```json
{
  "message": "Validation failed",
  "details": ["..."]
}
```

HTTP status guidance:
- `200` success read/update
- `201` created
- `204` deleted
- `400` invalid payload
- `404` not found
- `409` duplicate key / ID conflict
- `500` server error

---

## 7) Frontend Requirements

Create pages:
1. **Users Page**
   - users table
   - create/edit/delete user
   - manage purchases (multi-select products)
2. **Products Page**
   - products table
   - create/edit/delete product
3. **User Purchases Report Page**
   - table: user + list of product names

UI requirements:
- loading and error states for each page
- form validation messages
- confirmation before delete

---

## 8) MongoDB & Indexing

Database: `kivun_ai`
Collections: `users`, `products`

Create indexes:
- `users.id` unique
- `products.id` unique
- optional: `users.purchases` for query performance

---

## 9) Acceptance Criteria

- Full CRUD works for users and products
- User purchase constraints are enforced
- Join report endpoint returns correct expanded data
- Frontend can manage all entities without direct DB access
- Input validation and error handling are implemented
- App runs locally with setup instructions

---

## 10) Local Run Instructions (Target)

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Example `.env`
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=kivun_ai
CORS_ORIGIN=http://localhost:5173
```

---

## 11) Suggested Next Tasks

1. Scaffold backend with Express + Mongo connection
2. Implement `products` CRUD first
3. Implement `users` CRUD and purchases validation
4. Add `/reports/users-products` aggregation route
5. Build frontend pages and forms
6. Add tests for all API routes

---

## 12) Definition of Done

- All endpoints implemented and tested
- Frontend screens completed
- CRUD and join report demonstrated with live MongoDB data
- README updated with final run and test commands
