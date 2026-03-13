import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/products';

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const products = await getAllProducts();

    const transformedProducts = products.map((product: any) => ({
      id: product.id,
      name: product.name,
      description: product.description || '',
      imageUrl: product.imageUrl || '',
      category: product.category?.slug || null
    }));

    return NextResponse.json({
      success: true,
      data: transformedProducts
    });

  } catch (error) {
    console.error('Error fetching all products:', error);

    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}