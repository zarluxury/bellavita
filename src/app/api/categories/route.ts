import { NextRequest, NextResponse } from 'next/server';
import { createCategory } from '@/lib/products';
import { requireApiToken } from '@/lib/apiToken';

export async function POST(request: NextRequest) {
  const authError = requireApiToken(request);
  if (authError) return authError;
  try {
    const { name, slug } = await request.json();

    console.log('Creating category:', { name, slug });

    // Validate input
    if (!name || !slug) {
      console.log('Validation failed: missing name or slug');
      return NextResponse.json(
        { success: false, error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Validate slug format (alphanumeric and hyphens only)
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(slug)) {
      console.log('Validation failed: invalid slug format');
      return NextResponse.json(
        { success: false, error: 'Slug must contain only lowercase letters, numbers, and hyphens' },
        { status: 400 }
      );
    }

    // Create category (without explicit initialization since tables should exist)
    const category = await createCategory(slug, name);
    console.log('Category created successfully:', category);

    return NextResponse.json({
      success: true,
      data: {
        message: 'Category created successfully',
        category
      }
    });

  } catch (error) {
    console.error('Error creating category:', error);
    
    // Handle duplicate slug error
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return NextResponse.json(
        { success: false, error: 'A category with this slug already exists' },
        { status: 409 }
      );
    }

    // Handle database connection errors
    if (error instanceof Error && error.message.includes('connect')) {
      return NextResponse.json(
        { success: false, error: 'Database connection failed' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: `Failed to create category: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const authError = requireApiToken(request);
  if (authError) return authError;
  try {
    const { getAllCategories } = await import('@/lib/products');
    const categories = await getAllCategories();

    return NextResponse.json({
      success: true,
      data: categories
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
