import { NextRequest, NextResponse } from 'next/server';

const categoryMap: { [key: string]: string } = {
  'smart-switches': 'SMART SWITCH',
  'smart-lights': 'SMART LIGHT',
  'curtain-track-motor': 'CURTAIN TRACK & MOTOR',
  'smart-locks': 'LOCK',
  'ir-remote-sensors': 'IR REMOTE & SENSORE',
  'multifunction-screens': 'MUTIFUCATION SCREEN',
  'drivers-controllers': 'DRIVER - CONTROLLER - NODE - RELAY',
  'gateways': 'GATWAY',
  'scene-switches': 'SCENE SWITCH',
  'smart-knob': 'SMART KNOB'
};

// Predefined product lists based on actual folder contents
const productDatabase: { [key: string]: any[] } = {
  'curtain-track-motor': [
    {
      name: 'Curtain Motor',
      image: '/images/PRODUCT DRIVE/CURTAIN TRACK & MOTOR/CURTAIN MOTOR.png',
      description: 'High-performance motor for smooth and quiet curtain operation.'
    },
    {
      name: 'Curtain Track - 1',
      image: '/images/PRODUCT DRIVE/CURTAIN TRACK & MOTOR/CURTAIN TRACK - 1.png',
      description: 'Premium aluminum track system for curtain installation.'
    },
    {
      name: 'Curtain Track - 2',
      image: '/images/PRODUCT DRIVE/CURTAIN TRACK & MOTOR/CURTAIN TRACK - 2.png',
      description: 'Heavy-duty curtain track for large window treatments.'
    }
  ],
  'smart-switches': [
    {
      name: 'Titan Switch - 2M 2Touch + Knob',
      image: '/images/PRODUCT DRIVE/SMART SWITCH/TITTAN SWITCH FRONT SIDE/1. 2M 2TOUCH + KNOB.png',
      description: 'Advanced titan switch with 2 modules and knob control.'
    },
    {
      name: 'Titan Switch - 4M 4Touch + 4Touch',
      image: '/images/PRODUCT DRIVE/SMART SWITCH/TITTAN SWITCH FRONT SIDE/10. 4M 4 TOUCH  + 4 TOUCH.png',
      description: 'Multi-module titan switch with 8 touch controls.'
    },
    {
      name: 'White Series - 10 Touch',
      image: '/images/PRODUCT DRIVE/SMART SWITCH/WHITE/10 TOUCH FRONT - WITHOUT BRAND - WHITE.png',
      description: 'White series switch with 10 touch controls.'
    }
  ],
  'smart-lights': [
    {
      name: 'RGB Bulb',
      image: '/images/PRODUCT DRIVE/SMART LIGHT/RGB BULB.png',
      description: 'Color-changing LED bulb with millions of colors.'
    },
    {
      name: 'Downlight',
      image: '/images/PRODUCT DRIVE/SMART LIGHT/DOWN LIGHT.png',
      description: 'Recessed smart downlight for ambient lighting.'
    }
  ],
  'smart-locks': [
    {
      name: 'Fingerprint Lock',
      image: '/images/PRODUCT DRIVE/LOCK/FINGERPRINT LOCK.png',
      description: 'Biometric lock with fingerprint recognition.'
    },
    {
      name: 'Glass Door Lock',
      image: '/images/PRODUCT DRIVE/LOCK/GLASS DOOR LOCK.png',
      description: 'Smart lock designed for glass doors.'
    }
  ],
  'scene-switches': [
    {
      name: '8 Scene Switch',
      image: '/images/PRODUCT DRIVE/SCENE SWITCH/8 SCENE SWITCH.png',
      description: 'Programmable scene switch with 8 preset scenes.'
    },
    {
      name: 'Scene Controller',
      image: '/images/PRODUCT DRIVE/SCENE SWITCH/1.png',
      description: 'Advanced scene controller for custom automation.'
    }
  ],
  'multifunction-screens': [
    {
      name: '10 Inch Screen',
      image: '/images/PRODUCT DRIVE/MUTIFUCATION SCREEN/10 INCH SCREEN.png',
      description: '10-inch touch screen for complete home control.'
    }
  ],
  'drivers-controllers': [
    {
      name: 'Control Node',
      image: '/images/PRODUCT DRIVE/DRIVER - CONTROLLER - NODE - RELAY/1 NODE.png',
      description: 'Essential control node for automation systems.'
    }
  ],
  'gateways': [
    {
      name: 'Wired Pro Gateway',
      image: '/images/PRODUCT DRIVE/GATWAY/WIRED PRO.png',
      description: 'Professional wired gateway for reliable connectivity.'
    }
  ]
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    if (!category || !categoryMap[category]) {
      // Return all categories
      const categories = Object.keys(categoryMap).map(key => ({
        id: key,
        title: key.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        folder: categoryMap[key]
      }));
      
      return NextResponse.json({ categories });
    }

    // Return products from predefined database
    const products = productDatabase[category] || [];
    
    return NextResponse.json({ 
      category: {
        id: category,
        title: category.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        folder: categoryMap[category]
      },
      products 
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
