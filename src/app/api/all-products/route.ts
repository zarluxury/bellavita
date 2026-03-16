import { NextRequest, NextResponse } from 'next/server';

// Fallback static data when database is not available
const staticProducts = [
  {
    id: '1',
    name: 'Curtain Motor',
    description: 'High-performance motor for smooth and quiet curtain operation.',
    imageUrl: '/images/PRODUCT DRIVE/CURTAIN TRACK & MOTOR/CURTAIN MOTOR.png',
    category: 'curtain-track-motor'
  },
  {
    id: '2',
    name: 'Titan Switch - 2M 2Touch + Knob',
    description: 'Advanced titan switch with 2 modules and knob control.',
    imageUrl: '/images/PRODUCT DRIVE/SMART SWITCH/TITTAN SWITCH FRONT SIDE/1. 2M 2TOUCH + KNOB.png',
    category: 'smart-switches'
  },
  {
    id: '3',
    name: 'RGB Bulb',
    description: 'Color-changing LED bulb with millions of colors.',
    imageUrl: '/images/PRODUCT DRIVE/SMART LIGHT/RGB BULB.png',
    category: 'smart-lights'
  },
  {
    id: '4',
    name: 'Fingerprint Lock',
    description: 'Biometric lock with fingerprint recognition.',
    imageUrl: '/images/PRODUCT DRIVE/LOCK/FINGERPRINT LOCK.png',
    category: 'smart-locks'
  },
  {
    id: '5',
    name: '8 Scene Switch',
    description: 'Programmable scene switch with 8 preset scenes.',
    imageUrl: '/images/PRODUCT DRIVE/SCENE SWITCH/8 SCENE SWITCH.png',
    category: 'scene-switches'
  }
];

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {

    
    // Try to get products from database first
    const { getAllProducts } = await import('@/lib/products');
    
    if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgresql://')) {
      try {
        console.log('Attempting database connection...');
        const products = await getAllProducts();
        
        const transformedProducts = products.map((product: any) => ({
          id: product.id,
          name: product.name,
          description: product.description || '',
          imageUrl: product.imageUrl || '',
          category: product.category?.slug || null
        }));

        console.log(`Successfully fetched ${products.length} products from database`);
        
        return NextResponse.json({
          success: true,
          data: transformedProducts,
          source: 'database'
        });
      } catch (dbError) {
        console.error('Database error, falling back to static data:', dbError);
        
        // Fall back to static data if database fails
        return NextResponse.json({
          success: true,
          data: staticProducts,
          source: 'static_fallback',
          error: 'Database connection failed'
        });
      }
    } else {
      // No database URL configured, use static data
      console.warn('DATABASE_URL not configured or invalid, using static data');
      
      return NextResponse.json({
        success: true,
        data: staticProducts,
        source: 'static_default',
        warning: 'DATABASE_URL not configured'
      });
    }

  } catch (error) {
    console.error('Unexpected error in /api/all-products:', error);
    
    // Final fallback to static data
    return NextResponse.json({
      success: true,
      data: staticProducts,
      source: 'static_emergency',
      error: 'Unexpected error occurred'
    });
  }
}