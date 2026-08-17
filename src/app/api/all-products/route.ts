import { NextRequest, NextResponse } from 'next/server';
import { requireApiToken } from '@/lib/apiToken';

// Fallback static data when database is not available
const staticProducts = [
  {
    id: '1',
    name: 'Curtain Motor',
    description: 'High-performance motor for smooth and quiet curtain operation.',
    imageUrl: `${process.env.R2_PUBLIC_URL}/images/PRODUCT DRIVE/CURTAIN TRACK & MOTOR/CURTAIN MOTOR.png`,
    category: 'curtain-track-motor'
  },
  {
    id: '2',
    name: 'Titan Switch - 2M 2Touch + Knob',
    description: 'Advanced titan switch with 2 modules and knob control.',
    imageUrl: `${process.env.R2_PUBLIC_URL}/images/PRODUCT DRIVE/SMART SWITCH/TITTAN SWITCH FRONT SIDE/1. 2M 2TOUCH + KNOB.png`,
    category: 'smart-switches'
  },
  {
    id: '3',
    name: 'RGB Bulb',
    description: 'Color-changing LED bulb with millions of colors.',
    imageUrl: `${process.env.R2_PUBLIC_URL}/images/PRODUCT DRIVE/SMART LIGHT/RGB BULB.png`,
    category: 'smart-lights'
  },
  {
    id: '4',
    name: 'Fingerprint Lock',
    description: 'Biometric lock with fingerprint recognition.',
    imageUrl: `${process.env.R2_PUBLIC_URL}/images/PRODUCT DRIVE/LOCK/FINGERPRINT LOCK.png`,
    category: 'smart-locks'
  },
  {
    id: '5',
    name: '8 Scene Switch',
    description: 'Programmable scene switch with 8 preset scenes.',
    imageUrl: `${process.env.R2_PUBLIC_URL}/images/PRODUCT DRIVE/SCENE SWITCH/8 SCENE SWITCH.png`,
    category: 'scene-switches'
  }
];

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const authError = requireApiToken(request);
  if (authError) return authError;
  try {
    // First, check if we have a valid DATABASE_URL
    const hasValidDbUrl = process.env.DATABASE_URL && 
                         process.env.DATABASE_URL.startsWith('postgresql://');
    
    if (!hasValidDbUrl) {
      // Return static data immediately if no database URL
      return NextResponse.json({
        success: true,
        data: staticProducts,
        source: 'static_no_db'
      });
    }

    // Try database connection with timeout
    try {
      // Dynamic import to avoid loading Prisma if not needed
      const { getAllProducts } = await import('@/lib/products');
      
      // Set a timeout for database operation
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Database timeout')), 5000);
      });
      
      const dbPromise = getAllProducts();
      const products = await Promise.race([dbPromise, timeoutPromise]) as any[];
      
      const transformedProducts = products.map((product: any) => ({
        id: product.id,
        name: product.name,
        description: product.description || '',
        imageUrl: product.image_url || '',
        category: product.category?.slug || null
      }));

      // Transform image URLs to use R2 public URL if they start with /images/
      const productsWithR2Urls = transformedProducts.map((product: any) => ({
        ...product,
        imageUrl: product.imageUrl.startsWith('/images/') 
          ? `${process.env.R2_PUBLIC_URL}${product.imageUrl}`
          : product.imageUrl
      }));

      return NextResponse.json({
        success: true,
        data: productsWithR2Urls,
        source: 'database'
      });
      
    } catch (dbError) {
      // Any database error falls back to static data
      return NextResponse.json({
        success: true,
        data: staticProducts,
        source: 'static_fallback',
        error: dbError instanceof Error ? dbError.message : 'Database error'
      });
    }

  } catch (error) {
    // Ultimate fallback - should never reach here but just in case
    return NextResponse.json({
      success: true,
      data: staticProducts,
      source: 'static_emergency',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}