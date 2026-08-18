import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

import { categories } from '../data/categories';
import { locations } from '../data/locations';
import { warehouses } from '../data/warehouses';
import { suppliers } from '../data/suppliers';
import { products } from '../data/products';

async function main() {
  const { default: driver } = await import('../lib/cognodb');

  try {
    console.log('🌱 Starting database seed...\n');


    for (const category of categories) {
      await driver.executeQuery(
        `
        MERGE (c:Category {id: $id})
        SET c.name = $name
        `,
        category
      );
    }

    console.log(`✅ Categories: ${categories.length}`);



    for (const location of locations) {
      await driver.executeQuery(
        `
        MERGE (l:Location {id: $id})
        SET
          l.city = $city,
          l.state = $state
        `,
        location
      );
    }

    console.log(`✅ Locations: ${locations.length}`);


    for (const warehouse of warehouses) {
      await driver.executeQuery(
        `
        MERGE (w:Warehouse {id: $id})
        SET w.name = $name
        `,
        warehouse
      );

      await driver.executeQuery(
        `
        MATCH (w:Warehouse {id: $warehouseId})
        MATCH (l:Location {id: $locationId})
        MERGE (w)-[:LOCATED_IN]->(l)
        `,
        {
          warehouseId: warehouse.id,
          locationId: warehouse.locationId,
        }
      );
    }

    console.log(`✅ Warehouses: ${warehouses.length}`);



    for (const supplier of suppliers) {
      await driver.executeQuery(
        `
        MERGE (s:Supplier {id: $id})
        SET
          s.name = $name,
          s.city = $city
        `,
        supplier
      );

      await driver.executeQuery(
        `
        MATCH (s:Supplier {id: $supplierId})
        MATCH (l:Location {id: $locationId})
        MERGE (s)-[:OPERATES_IN]->(l)
        `,
        {
          supplierId: supplier.id,
          locationId: supplier.locationId,
        }
      );
    }

    console.log(`✅ Suppliers: ${suppliers.length}`);


    for (const product of products) {
      await driver.executeQuery(
        `
        MERGE (p:Product {id: $id})
        SET
          p.name = $name,
          p.price = $price
        `,
        {
          id: product.id,
          name: product.name,
          price: product.price,
        }
      );

      // Product -> Category
      await driver.executeQuery(
        `
        MATCH (p:Product {id: $productId})
        MATCH (c:Category {id: $categoryId})
        MERGE (p)-[:BELONGS_TO]->(c)
        `,
        {
          productId: product.id,
          categoryId: product.categoryId,
        }
      );

      // Supplier -> Product
      for (const supplierId of product.supplierIds) {
        await driver.executeQuery(
          `
          MATCH (s:Supplier {id: $supplierId})
          MATCH (p:Product {id: $productId})
          MERGE (s)-[:SUPPLIES]->(p)
          `,
          {
            supplierId,
            productId: product.id,
          }
        );
      }
    }

    console.log(`✅ Products: ${products.length}`);


    for (const product of products) {
      const warehouseIndex =
        parseInt(product.id.split('-')[1], 10) % warehouses.length;

      const warehouse = warehouses[warehouseIndex];

      await driver.executeQuery(
        `
        MATCH (w:Warehouse {id: $warehouseId})
        MATCH (p:Product {id: $productId})
        MERGE (w)-[:STORES]->(p)
        `,
        {
          warehouseId: warehouse.id,
          productId: product.id,
        }
      );
    }

    console.log(`✅ Warehouse → Product relationships created`);



    for (const supplier of suppliers) {
      const warehouseIndex =
        parseInt(supplier.id.split('-')[1], 10) % warehouses.length;

      const warehouse = warehouses[warehouseIndex];

      await driver.executeQuery(
        `
        MATCH (s:Supplier {id: $supplierId})
        MATCH (w:Warehouse {id: $warehouseId})
        MERGE (s)-[:SERVES]->(w)
        `,
        {
          supplierId: supplier.id,
          warehouseId: warehouse.id,
        }
      );
    }

    console.log(`✅ Supplier → Warehouse relationships created`);

    console.log('\n🎉 Seed completed successfully!');
  } catch (error) {
    console.error('\n❌ Seed failed:', error);
    process.exit(1);
  } finally {
    await driver.close();
  }
}

main();