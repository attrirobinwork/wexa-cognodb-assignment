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
            -[:SUPPLIES]->(:Product)
            -[:BELONGS_TO]->(c:Category)
            <-[:BELONGS_TO]-(:Product)
            <-[:SUPPLIES]-(alternative:Supplier)

      WHERE alternative.id <> $supplierId

      RETURN DISTINCT
        alternative,
        collect(DISTINCT c.name) AS sharedCategories
      ORDER BY alternative.name
      `,
      {
        supplierId: id,
      }
    );

    const alternatives = result.records.map((record) => {
      const supplier = record.get('alternative');

      return {
        ...supplier.properties,
        sharedCategories: record.get('sharedCategories'),
      };
    });

    return NextResponse.json({
      success: true,
      data: alternatives,
    });
  } catch (error) {
    console.error('Failed to find alternative suppliers:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to find alternative suppliers',
      },
      { status: 500 }
    );
  }
}