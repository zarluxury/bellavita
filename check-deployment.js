// Simple script to test database connection
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Check if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL is not configured');
      return false;
    }
    
    console.log('✅ DATABASE_URL is configured');
    
    // Test database connection
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connection successful');
    
    // Test product query
    const products = await prisma.product.findMany({
      take: 1,
      include: {
        category: true
      }
    });
    
    console.log(`✅ Found ${products.length} products`);
    return true;
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
