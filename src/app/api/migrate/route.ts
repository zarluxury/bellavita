import { NextRequest, NextResponse } from 'next/server';
import { uploadToR2 } from '@/lib/r2';
import { createProduct, getAllCategories } from '@/lib/products';
import { requireApiToken } from '@/lib/apiToken';

// Sample hardcoded products data for migration
const sampleProducts = [
  {
    name: 'Coved Switch - Black',
    description: 'Premium black coved switches with sleek modern design and touch controls.\n\nAvailable Variants:\n• 1 Module Switch\n• 2 Touch + 1 Curtain + Socket\n• 6-8M 8 Touch + Socket\n• 4M 2 Touch + Curtain + Socket',
    categorySlug: 'smart-switches'
  },
  {
    name: 'Titan Switch - Front View',
    description: 'Advanced titan series switches with modular configuration options.\n\nAvailable Variants:\n• 2M 2 Touch + Knob\n• 2M 4 Touch\n• 2M 6 Touch\n• 4M Knob + Socket\n• 4M 4 Touch + Socket\n• 4M 6 Touch + Socket\n• 6-8M Knob + 4 Touch + Socket\n• 6-8M Knob + 6 Touch + Socket',
    categorySlug: 'smart-switches'
  },
  {
    name: 'Titan Switch - Slant View',
    description: 'Elegant slant-design titan switches with ergonomic touch controls.\n\nAvailable Variants:\n• 6 Switch\n• Knob + 4 Touch\n• Knob + 6 Touch\n• 8 Touch\n• 12 Touch\n• Knob + 8 Touch\n• Knob + 12 Touch\n• 4 Touch + 1 Socket\n• 6 Touch + 1 Socket\n• 12 Touch + 1 Socket',
    categorySlug: 'smart-switches'
  },
  {
    name: 'White Series Switches',
    description: 'Clean white switches perfect for modern minimalist interiors.\n\nAvailable Variants:\n• 10 Touch Front\n• 12M 5 Touch + 1 Fan + 1 Curtain + 3 Socket\n• 2 Touch + 1 Fan + Socket\n• 8 Touch + Socket\n• 8 Touch Front',
    categorySlug: 'smart-switches'
  },
  {
    name: 'RGB LED Lights - Premium',
    description: 'RGB LED lights with millions of colors and automated scene management.',
    categorySlug: 'smart-lights'
  },
  {
    name: 'Automated Curtain System',
    description: 'Automated curtain systems with quiet motors and precision tracking.',
    categorySlug: 'curtain-track-motor'
  },
  {
    name: 'Biometric Smart Lock',
    description: 'Biometric and app-controlled door locks with advanced security features.',
    categorySlug: 'smart-locks'
  },
  {
    name: 'Human Presence Sensor',
    description: 'Advanced sensors and remotes for comprehensive home automation.',
    categorySlug: 'ir-remote-sensors'
  },
  {
    name: '10 Inch Touch Screen',
    description: 'Touch screen controllers for complete home management.',
    categorySlug: 'multifunction-screens'
  },
  {
    name: 'Control Node',
    description: 'Essential control nodes and drivers for seamless automation.',
    categorySlug: 'drivers-controllers'
  },
  {
    name: 'Wired Pro Gateway',
    description: 'Smart gateways for connecting all your home automation devices.',
    categorySlug: 'gateways'
  },
  {
    name: 'Scene Control Switch',
    description: 'Programmable switches for custom scene control and automation.',
    categorySlug: 'scene-switches'
  }
];

export async function POST(request: NextRequest) {
  const authError = requireApiToken(request);
  if (authError) return authError;
  try {
    const { action } = await request.json();

    if (action === 'migrate-sample-products') {
      const results = [];
      
      for (const product of sampleProducts) {
        try {
          // Get categories to find the category ID
          const categories = await getAllCategories();
          const category = categories.find((cat: any) => cat.id === product.categorySlug);
          
          if (!category) {
            results.push({ 
              product: product.name, 
              status: 'error', 
              message: 'Category not found' 
            });
            continue;
          }

          // Get the actual category ID from the database
          const { getCategoryBySlug } = await import('@/lib/products');
          const categoryData = await getCategoryBySlug(product.categorySlug);
          
          if (!categoryData) {
            results.push({ 
              product: product.name, 
              status: 'error', 
              message: 'Category data not found' 
            });
            continue;
          }

          // Create product without image for now
          const newProduct = await createProduct({
            name: product.name,
            description: product.description,
            categoryId: categoryData.id, // Use the actual database ID
            imageUrl: '' // No image for now
          });

          results.push({ 
            product: product.name, 
            status: 'success', 
            productId: newProduct.id 
          });
          
        } catch (error) {
          results.push({ 
            product: product.name, 
            status: 'error', 
            message: error instanceof Error ? error.message : 'Unknown error' 
          });
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Migration completed',
        results
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { error: 'Migration failed' },
      { status: 500 }
    );
  }
}
