import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/products';

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    // Check if database is connected
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not configured');
      return NextResponse.json(
        { success: false, error: 'Database configuration missing' },
        { status: 500 }
      );
    }

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
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch products',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}