import { prisma } from '../src/lib/prisma';

async function updateImageUrls() {
  try {
    console.log('Updating image URLs in database...');
    
    // Get all products with old URLs
    const products = await prisma.product.findMany({
      where: {
        imageUrl: {
          contains: 'pub-48915f426a18cf4cc6e2173e70c12b08.r2.dev'
        }
      }
    });

    console.log(`Found ${products.length} products with old URLs`);

    // Update each product
    for (const product of products) {
      const oldUrl = product.imageUrl;
      
      // Skip if imageUrl is null or empty
      if (!oldUrl) {
        console.log(`Skipping ${product.name} - no image URL`);
        continue;
      }
      
      const newUrl = oldUrl.replace(
        'pub-48915f426a18cf4cc6e2173e70c12b08.r2.dev',
        'pub-4635819442b54e6684ecdaa44810ab46.r2.dev'
      );

      await prisma.product.update({
        where: { id: product.id },
        data: { imageUrl: newUrl }
      });

      console.log(`Updated: ${product.name}`);
      console.log(`  Old: ${oldUrl}`);
      console.log(`  New: ${newUrl}`);
    }

    console.log('✅ All image URLs updated successfully!');
  } catch (error) {
    console.error('❌ Error updating image URLs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateImageUrls();
