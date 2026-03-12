import { prisma } from '@/lib/prisma';

export interface ProductInput {
  name: string;
  description?: string;
  categoryId: string;
  imageUrl?: string;
}

export interface ProductResponse {
  id: string;
  name: string;
  description?: string;
  image: string;
  category: string;
}

/**
 * Create a new product in the database
 * @param productData - Product data to create
 * @returns Created product with category information
 */
export async function createProduct(productData: ProductInput): Promise<ProductResponse> {
  console.log('createProduct received data:', productData);
  
  const product = await prisma.product.create({
    data: productData,
    include: {
      category: {
        select: {
          slug: true,
          name: true,
        }
      }
    }
  });

  console.log('Product created in DB with imageUrl:', product.imageUrl);

  return {
    id: product.id,
    name: product.name,
    description: product.description || '',
    image: product.imageUrl || '',
    category: product.category.slug,
  };
}

/**
 * Get products by category slug
 * @param categorySlug - Category slug to filter by
 * @returns Array of products in the specified category
 */
export async function getProductsByCategory(categorySlug: string): Promise<any[]> {
  const categoryData = await prisma.category.findUnique({
    where: { slug: categorySlug },
    include: {
      products: {
        select: {
          id: true,
          name: true,
          description: true,
          imageUrl: true,
        },
        orderBy: {
          name: 'asc'
        }
      }
    }
  });

  if (!categoryData) {
    throw new Error('Category not found');
  }

  return categoryData.products.map((product) => ({
    name: product.name,
    image: product.imageUrl || '',
    description: product.description || ''
  }));
}

/**
 * Get all categories with product counts
 * @returns Array of categories with product counts
 */
export async function getAllCategories() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc'
    }
  });

  // Get product counts separately
  const categoriesWithCounts = await Promise.all(
    categories.map(async (category) => {
      const productCount = await prisma.product.count({
        where: { categoryId: category.id }
      });
      
      return {
        id: category.id, // Keep the actual database ID
        slug: category.slug, // Add the slug field
        title: category.name,
        folder: category.name,
        productCount
      };
    })
  );

  return categoriesWithCounts;
}

/**
 * Get a single product by ID
 * @param productId - Product ID
 * @returns Product details or null if not found
 */
export async function getProductById(productId: string) {
  return await prisma.product.findUnique({
    where: { id: productId },
    include: {
      category: {
        select: {
          slug: true,
          name: true,
        }
      }
    }
  });
}

/**
 * Update a product
 * @param productId - Product ID to update
 * @param updateData - Data to update
 * @returns Updated product
 */
export async function updateProduct(productId: string, updateData: Partial<ProductInput>) {
  return await prisma.product.update({
    where: { id: productId },
    data: updateData,
    include: {
      category: {
        select: {
          slug: true,
          name: true,
        }
      }
    }
  });
}

/**
 * Get all products with category information
 * @returns Array of all products
 */
export async function getAllProducts() {
  return await prisma.product.findMany({
    include: {
      category: {
        select: {
          slug: true,
          name: true,
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

/**
 * Delete a product
 * @param productId - Product ID to delete
 * @returns Deleted product
 */
export async function deleteProduct(productId: string) {
  return await prisma.product.delete({
    where: { id: productId }
  });
}

/**
 * Get category by slug
 * @param slug - Category slug
 * @returns Category details or null if not found
 */
export async function getCategoryBySlug(slug: string) {
  return await prisma.category.findUnique({
    where: { slug },
    include: {
      _count: {
        select: {
          products: true
        }
      }
    }
  });
}
