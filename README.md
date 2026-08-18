# wexa AI

A graph-powered supplier discovery application built with Next.js, TypeScript, Neo4j Driver, and CognoDB.

SupplyGraph helps users explore supplier relationships, products, categories, warehouses, and locations through a connected graph data model.

The main feature is discovering alternative suppliers by traversing relationships between suppliers, products, and categories.

---

## Demo

Hosted Demo:

> Add your deployed URL here

GitHub:

> Add your GitHub repository URL here

---

## Overview

Supply chains are highly connected.

A supplier can supply multiple products, products belong to categories, suppliers operate in different locations, warehouses store products, and multiple suppliers may provide products belonging to the same category.

Instead of treating these connections as unrelated database tables, SupplyGraph models them directly as relationships in a graph.

The application allows users to:

- Search suppliers
- View supplier details
- Explore products supplied by a supplier
- View product categories
- Discover alternative suppliers
- Understand why suppliers are connected

---

# Why a Graph Database?

The main use case of this application is relationship-based supplier discovery.

A relational database could model this using multiple tables and join tables:

- suppliers
- products
- categories
- supplier_products
- product_categories
- warehouses
- locations

Finding alternative suppliers could then require several joins across these tables.

With a graph database, the relationships are first-class entities.

For example:

Supplier → Product → Category ← Product ← Supplier

This allows the application to traverse the graph directly to discover suppliers connected through shared categories.

The alternative supplier query is a multi-hop traversal:

Supplier
↓
Product
↓
Category
↑
Product
↑
Supplier

This relationship-driven query is the main reason a graph database is useful for this application.

---

# Technology Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- CognoDB
- Neo4j JavaScript Driver
- openCypher
- Vercel

---

# Graph Data Model

## Nodes

### Supplier

Represents a supplier in the supply network.

Properties:

- id
- name
- city

### Product

Represents a product supplied by one or more suppliers.

Properties:

- id
- name
- price

### Category

Represents a product category.

Properties:

- id
- name

### Warehouse

Represents a warehouse in the supply network.

Properties:

- id
- name

### Location

Represents a geographical location.

Properties:

- id
- city
- state

---

# Relationships

```text
Supplier ──SUPPLIES──────► Product

Product ──BELONGS_TO─────► Category

Supplier ──OPERATES_IN───► Location

Warehouse ──LOCATED_IN────► Location

Warehouse ──STORES────────► Product

Supplier ──SERVES─────────► Warehouse





Graph Example
                    ┌──────────────┐
                    │   Category   │
                    │ Electronics  │
                    └──────▲───────┘
                           │
                       BELONGS_TO
                           │
                    ┌──────┴───────┐
                    │   Product    │
                    │ Laptop Pro14 │
                    └──────▲───────┘
                           │
                         SUPPLIES
                           │
                    ┌──────┴───────┐
                    │   Supplier   │
                    │ TechSource   │
                    └──────┬───────┘
                           │
                      OPERATES_IN
                           │
                    ┌──────▼───────┐
                    │   Location   │
                    │    Delhi     │
                    └──────────────┘

Alternative Supplier Traversal

The application discovers alternative suppliers using the following graph path:

Supplier
   │
   │ SUPPLIES
   ▼
Product
   │
   │ BELONGS_TO
   ▼
Category
   ▲
   │ BELONGS_TO
   │
Product
   ▲
   │ SUPPLIES
   │
Supplier



**Seed Data**

The project includes a seed script for realistic graph data.

Current dataset:

30 Suppliers
100 Products
15 Categories
10 Warehouses
10 Locations

Run the seed script with: npm run seed



** folder structure ***

app/
├── api/
│   └── suppliers/
│       ├── route.ts
│       └── [id]/
│           ├── route.ts
│           └── alternatives/
│               └── route.ts
│
└── suppliers/
    ├── page.tsx
    ├── loading.tsx
    └── [id]/
        ├── page.tsx
        └── loading.tsx

components/
└── suppliers/
    ├── SupplierSearch.tsx
    ├── SupplierCard.tsx
    ├── SupplierList.tsx
    ├── SupplierHeader.tsx
    ├── ProductCard.tsx
    ├── AlternativeSupplierCard.tsx
    └── EmptyState.tsx

data/
├── categories.ts
├── locations.ts
├── warehouses.ts
├── suppliers.ts
└── products.ts

lib/
└── cognodb.ts

scripts/
└── seed.ts



***Main Graph Query***

The alternative supplier feature uses a multi-hop Cypher query:

MATCH (s:Supplier {id: $supplierId})
      -[:SUPPLIES]->(:Product)
      -[:BELONGS_TO]->(c:Category)
      <-[:BELONGS_TO]-(:Product)
      <-[:SUPPLIES]-(alternative:Supplier)


WHERE alternative.id <> $supplierId


RETURN DISTINCT
  alternative,
  collect(DISTINCT c.name) AS sharedCategories



 ** Setup**
   Requirements
   Node.js
   npm
   CognoDB instance
   Neo4j JavaScript Driver
   1. Clone the Repository
   git clone YOUR_GITHUB_REPOSITORY_URL

Then:

   cd wexa-cognodb-assignment
   2. Install Dependencies
   npm install
   3. Configure Environment Variables

***Create a .env.local file:**

   COGNODB_URI=your-cognodb-uri
   COGNODB_USERNAME=your-cognodb-username
   COGNODB_PASSWORD=your-cognodb-password
   NEXT_PUBLIC_API_URL=http://localhost:3000

   Do not commit .env.local to the repository.

4. Seed the Database

      Run:

      npm run seed

      Expected seed data:

      15 Categories
      10 Locations
      10 Warehouses
      30 Suppliers
      100 Products

      The seed script also creates the graph relationships between these entities.

5. Start the Development Server
   npm run dev

   Open:

   http://localhost:3000/suppliers
   UI/UX

   The application follows a simple supplier discovery workflow:

   Supplier Listing
         ↓
   Search
         ↓
   Supplier Details
         ↓
   Products & Categories
         ↓
   Alternative Suppliers

The UI provides:

   Clear supplier cards
   Search functionality
   Supplier detail pages
   Product cards
   Alternative supplier recommendations
   Loading states
   Empty states
   Error handling
   Responsive layouts

The alternative supplier section highlights the graph-powered functionality so users can understand why a supplier is recommended.

Screenshots

   Add screenshots of the final application here.

   Supplier Discovery

   Supplier Details

   Alternative Suppliers

   Error Handling

   The API handles database errors and returns structured error responses.

Example:

{
  "success": false,
  "message": "Failed to fetch suppliers"
}

The UI also provides:

   Loading states
   Empty states
   Error states
   Supplier not found handling
   Security

Database credentials are stored in .env.local and are not committed to the repository.

The following files should never be committed:

   .env
   .env.local
   .env.*.local

Make sure .gitignore contains:

   .env
   .env.local
   .env.*.local