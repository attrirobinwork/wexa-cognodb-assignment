# SupplyGraph

A graph-powered supplier discovery application built with Next.js,
TypeScript, Tailwind CSS, CognoDB, and the Neo4j JavaScript Driver.

SupplyGraph helps users explore supplier relationships, products,
categories, warehouses, and locations through a connected graph data model.

The main feature is discovering alternative suppliers by traversing
relationships between suppliers, products, and categories.

---

## Demo

### Live Demo

https://wexa-cognodb-assignment-henna.vercel.app

### GitHub Repository

https://github.com/attribrobinwork/wexa-cognodb-assignment

---

# Overview

Supply chains are highly connected.

A supplier can supply multiple products, products belong to categories,
suppliers operate in different locations, warehouses store products, and
multiple suppliers may provide products belonging to the same category.

Instead of treating these connections as unrelated database records,
SupplyGraph models them directly as relationships in a graph.

The application allows users to:

- Search suppliers
- View supplier details
- Explore products supplied by a supplier
- View product categories
- Discover alternative suppliers
- Understand why suppliers are connected
- Explore graph-based supplier relationships

---

# Problem / Use Case

The main problem addressed by SupplyGraph is supplier discovery.

Given a supplier, the application can discover other suppliers that are
connected through shared product categories.

For example:

   Supplier
      ↓
   Product
      ↓
   Category
      ↑
   Product
      ↑
   Alternative Supplier



## Why Graph Database?

SupplyGraph uses a graph database because the application focuses on
relationships between suppliers, products, and categories.

The main relationship is:

Supplier → Product → Category ← Product ← Supplier

This allows the application to discover alternative suppliers through
multi-hop graph traversal.

---

## Data Model

### Nodes

- Supplier
- Product
- Category
- Warehouse
- Location

### Relationships
   -Supplier ──SUPPLIES──────► Product
  - Product ──BELONGS_TO─────► Category
  - Supplier ──OPERATES_IN───► Location
  - Warehouse ──LOCATED_IN────► Location
  - Warehouse ──STORES────────► Product
  - Supplier ──SERVES─────────► Warehouse