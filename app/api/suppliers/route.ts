import { NextResponse } from 'next/server';
import driver from '@/lib/cognodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.trim() || '';

    const result = await driver.executeQuery(
      `
      MATCH (s:Supplier)
      WHERE $search = ''
         OR toLower(s.name) CONTAINS toLower($search)
         OR toLower(s.city) CONTAINS toLower($search)

      OPTIONAL MATCH (s)-[:SUPPLIES]->(p:Product)

      RETURN
        s,
        count(DISTINCT p) AS productCount

      ORDER BY s.name
      `,
      {
        search,
      }
    );

    const suppliers = result.records.map((record) => {
      const supplier = record.get('s');

      return {
        ...supplier.properties,
        productCount: record.get('productCount').toNumber(),
      };
    });

    return NextResponse.json({
      success: true,
      data: suppliers,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch suppliers',
      },
      { status: 500 }
    );
  }
}