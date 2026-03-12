import { NextRequest, NextResponse } from 'next/server';
import { uploadToR2 } from '@/lib/r2';
import { 
  createProduct, 
  getProductsByCategory, 
  getAllCategories,
  getCategoryBySlug 
} from '@/lib/products';
import { 
  validateProductFormData,
  createErrorResponse,
  createSuccessResponse,
  handleApiError,
  checkRateLimit
} from '@/lib/api-utils';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

const categoryMap: { [key: string]: string } = {
  'smart-switches': 'SMART SWITCH',
  'smart-lights': 'SMART LIGHT',
  'curtain-track-motor': 'CURTAIN TRACK & MOTOR',
  'smart-locks': 'LOCK',
  'ir-remote-sensors': 'IR REMOTE & SENSORS',
  'multifunction-screens': 'MULTIFUNCTION SCREEN',
  'drivers-controllers': 'DRIVER - CONTROLLER - NODE - RELAY',
  'gateways': 'GATEWAY',
  'scene-switches': 'SCENE SWITCH',
  'smart-knob': 'SMART KNOB'
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    if (!category || !categoryMap[category]) {
      // Return all categories from database
      const categories = await getAllCategories();
      
      return createSuccessResponse({ categories });
    }

    // Return products from database for specific category
    const categoryData = await getCategoryBySlug(category);

    if (!categoryData) {
      return createErrorResponse('Category not found', 404);
    }

    const products = await getProductsByCategory(category);

    return createSuccessResponse({ 
      category: {
        id: category,
        title: category.split('-').map((word: string) => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        folder: categoryData.name
      },
      products 
    });

  } catch (error) {
    return handleApiError(error, 'GET /api/products');
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting (optional - using IP as identifier)
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimit = checkRateLimit(clientIP, 10, 60000); // 10 requests per minute
    
    if (!rateLimit.allowed) {
      return createErrorResponse(
        'Too many requests. Please try again later.',
        429
      );
    }

    const formData = await request.formData();
    
    // Validate form data
    console.log('Raw FormData entries:');
    for (const [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value);
    }
    
    const validation = validateProductFormData(formData);
    console.log('Validation result:', validation);
    
    if (!validation.valid) {
      console.error('Validation failed:', validation.error);
      return createErrorResponse(validation.error!, 400);
    }
    
    const { name, description, categorySlug, image } = validation.data!;
    console.log('Extracted form data:', { name, description, categorySlug, image: image?.name });

    // Validate category exists
    console.log('Looking for category with slug:', categorySlug);
    
    // First, let's get all available categories for debugging
    const allCategories = await prisma.category.findMany({
      select: { id: true, slug: true, name: true }
    });
    console.log('Available categories:', allCategories);
    
    const category = await getCategoryBySlug(categorySlug);
    console.log('Found category:', category);

    if (!category) {
      console.error('Category not found for slug:', categorySlug);
      return createErrorResponse(`Invalid category: ${categorySlug}`, 400);
    }

    let imageUrl = '';
    
    // Upload image to R2 if provided
    if (image) {
      try {
        console.log('Starting R2 upload for:', image.name);
        const uploadResult = await uploadToR2(image);
        imageUrl = uploadResult.url;
        console.log('Upload successful, URL:', imageUrl, 'Is local:', uploadResult.isLocal);
      } catch (uploadError) {
        console.error('R2 upload failed:', uploadError);
        // For now, we'll continue without the image but log the error
        // In production, you might want to handle this differently
        console.log('Continuing product creation without image due to upload failure');
      }
    } else {
      console.log('No image provided in request');
    }

    console.log('Final imageUrl to store:', imageUrl);

    // Create product in database using helper function
    try {
      const product = await createProduct({
        name,
        description,
        imageUrl,
        categoryId: category.id,
      });

      return createSuccessResponse({
        message: 'Product created successfully',
        product
      });
    } catch (dbError: any) {
      // Handle unique constraint violation
      if (dbError.code === 'P2002') {
        return createErrorResponse(
          'A product with this name already exists in this category. Please use a different name.',
          409
        );
      }
      throw dbError;
    }

  } catch (error) {
    return handleApiError(error, 'POST /api/products');
  }
}
