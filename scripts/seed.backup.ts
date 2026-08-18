import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });


async function main() {
    const { default: driver } = await import('@/lib/cognodb');
  try {
    const result = await driver.executeQuery( `
        MERGE (s:Supplier {id: $id})
        SET
          s.name = $name,
          s.city = $city
        RETURN s
        `,
        {
          id: 'supplier-001',
          name: 'TechSource India',
          city: 'Delhi',
        });

        const supplier = result.records[0].get('s');
        console.log('Supplier created:', supplier.properties);

         // Product
    const productResult = await driver.executeQuery(
        `
        MERGE (p:Product {id: $id})
        SET
          p.name = $name,
          p.price = $price
        RETURN p
        `,
        {
          id: 'product-001',
          name: 'Laptop Pro 14',
          price: 85000,
        }
      );
  
      const product = productResult.records[0].get('p');
  
      console.log('Product created:', product.properties);


      const categoryResult = await driver.executeQuery(
        `
        MERGE (c:Category {id: $id})
        SET
          c.name = $name
        RETURN c
        `,
        {
          id: 'category-001',
          name: 'Electronics',
        }
      );
      
      const category = categoryResult.records[0].get('c');
      
      console.log('Category created:', category.properties);

      const supplierProductResult = await driver.executeQuery(
        `
        MATCH (s:Supplier {id: $supplierId})
        MATCH (p:Product {id: $productId})
        MERGE (s)-[:SUPPLIES]->(p)
        RETURN s, p
        `,
        {
          supplierId: 'supplier-001',
          productId: 'product-001',
        }
      );
      
      console.log('Supplier -> Product relationship created');

      const productCategoryResult = await driver.executeQuery(
        `
        MATCH (p:Product {id: $productId})
        MATCH (c:Category {id: $categoryId})
        MERGE (p)-[:BELONGS_TO]->(c)
        RETURN p, c
        `,
        {
          productId: 'product-001',
          categoryId: 'category-001',
        }
      );
      
      console.log('Product -> Category relationship created');

      const supplier2Result = await driver.executeQuery(
        `
        MERGE (s:Supplier {id: $id})
        SET
          s.name = $name,
          s.city = $city
        RETURN s
        `,
        {
          id: 'supplier-002',
          name: 'Global Components',
          city: 'Mumbai',
        }
      );
      
      console.log(
        'Supplier 2 created:',
        supplier2Result.records[0].get('s').properties
      );

      const product2Result = await driver.executeQuery(
        `
        MERGE (p:Product {id: $id})
        SET
          p.name = $name,
          p.price = $price
        RETURN p
        `,
        {
          id: 'product-002',
          name: 'Gaming Monitor',
          price: 35000,
        }
      );
      
      console.log(
        'Product 2 created:',
        product2Result.records[0].get('p').properties
      );

      await driver.executeQuery(
        `
        MATCH (s:Supplier {id: $supplierId})
        MATCH (p:Product {id: $productId})
        MERGE (s)-[:SUPPLIES]->(p)
        `,
        {
          supplierId: 'supplier-002',
          productId: 'product-002',
        }
      );
      
      console.log('Supplier 2 -> Product 2 relationship created');

      await driver.executeQuery(
        `
        MATCH (p:Product {id: $productId})
        MATCH (c:Category {id: $categoryId})
        MERGE (p)-[:BELONGS_TO]->(c)
        `,
        {
          productId: 'product-002',
          categoryId: 'category-001',
        }
      );
      
      console.log('Product 2 -> Category relationship created');
   
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await driver.close();
  }
}

main();