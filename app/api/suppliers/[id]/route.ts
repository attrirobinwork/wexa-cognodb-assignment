import { NextResponse } from 'next/server';
import driver from '@/lib/cognodb';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, { params }: Props) {
  try {
    const { id } = await params;

    const result = await driver.executeQuery(
      `
      MATCH (s:Supplier {id: $supplierId})
      OPTIONAL MATCH (s)-[:SUPPLIES]->(p:Product)
      OPTIONAL MATCH (p)-[:BELONGS_TO]->(c:Category)

      RETURN
        s,
        collect({
          product: p,
          category: c
        }) AS products
      `,
      {
        supplierId: id,
      }
    );

    if (result.records.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Supplier not found',
        },
        { status: 404 }
      );
    }

    const supplierNode = result.records[0].get('s');
    const productRecords = result.records[0].get('products');

    const supplier = supplierNode.properties;

    const products = productRecords
      .filter((item: any) => item.product)
      .map((item: any) => ({
        ...item.product.properties,
        category: item.category?.properties?.name ?? null,
      }));

    return NextResponse.json({
      success: true,
      data: {
        ...supplier,
        products,
      },
    });
  } catch (error) {
    console.error('Failed to fetch supplier:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch supplier',
      },
      { status: 500 }
    );
  }
}