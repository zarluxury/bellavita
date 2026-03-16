import { query } from './db';

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

export interface Category {
  id: string;
  slug: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  category_id: string;
  created_at: Date;
  updated_at: Date;
  category?: {
    slug: string;
    name: string;
  };
}

/**
 * Create a new product in the database
 */
export async function createProduct(productData: ProductInput): Promise<ProductResponse> {
  console.log('createProduct received data:', productData);
  
  const result = await query(
    `INSERT INTO products (name, description, image_url, category_id) 
     VALUES ($1, $2, $3, $4) 
     RETURNING id, name, description, image_url, 
       (SELECT slug FROM categories WHERE id = $4) as category_slug`,
    [productData.name, productData.description, productData.imageUrl, productData.categoryId]
  );

  const product = result.rows[0];
  console.log('Product created in DB with imageUrl:', product.image_url);

  return {
    id: product.id,
    name: product.name,
    description: product.description || '',
    image: product.image_url || '',
    category: product.category_slug,
  };
}

/**
 * Get products by category slug
 */
export async function getProductsByCategory(categorySlug: string): Promise<any[]> {
  const result = await query(
    `SELECT p.id, p.name, p.description, p.image_url 
     FROM products p 
     JOIN categories c ON p.category_id = c.id 
     WHERE c.slug = $1 
     ORDER BY p.name ASC`,
    [categorySlug]
  );

  if (result.rows.length === 0) {
    // Check if category exists
    const categoryExists = await query(
      'SELECT id FROM categories WHERE slug = $1',
      [categorySlug]
    );
    if (categoryExists.rows.length === 0) {
      throw new Error('Category not found');
    }
  }

  return result.rows.map((product: any) => ({
    name: product.name,
    image: product.image_url || '',
    description: product.description || ''
  }));
}

/**
 * Get all categories with product counts
 */
export async function getAllCategories() {
  const result = await query(
    `SELECT c.id, c.slug, c.name, COUNT(p.id) as product_count 
     FROM categories c 
     LEFT JOIN products p ON c.id = p.category_id 
     GROUP BY c.id, c.slug, c.name 
     ORDER BY c.name ASC`
  );

  return result.rows.map((category: any) => ({
    id: category.id,
    slug: category.slug,
    title: category.name,
    folder: category.name,
    productCount: parseInt(category.product_count)
  }));
}

/**
 * Get a single product by ID
 */
export async function getProductById(productId: string): Promise<Product | null> {
  const result = await query(
    `SELECT p.id, p.name, p.description, p.image_url, p.category_id, 
            p.created_at, p.updated_at, c.slug, c.name as category_name
     FROM products p 
     JOIN categories c ON p.category_id = c.id 
     WHERE p.id = $1`,
    [productId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const product = result.rows[0];
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    image_url: product.image_url,
    category_id: product.category_id,
    created_at: product.created_at,
    updated_at: product.updated_at,
    category: {
      slug: product.slug,
      name: product.category_name,
    }
  };
}

/**
 * Update a product
 */
export async function updateProduct(productId: string, updateData: Partial<ProductInput>): Promise<Product> {
  const fields = [];
  const values = [];
  let paramIndex = 1;

  if (updateData.name !== undefined) {
    fields.push(`name = $${paramIndex++}`);
    values.push(updateData.name);
  }
  if (updateData.description !== undefined) {
    fields.push(`description = $${paramIndex++}`);
    values.push(updateData.description);
  }
  if (updateData.imageUrl !== undefined) {
    fields.push(`image_url = $${paramIndex++}`);
    values.push(updateData.imageUrl);
  }
  if (updateData.categoryId !== undefined) {
    fields.push(`category_id = $${paramIndex++}`);
    values.push(updateData.categoryId);
  }

  if (fields.length === 0) {
    throw new Error('No fields to update');
  }

  values.push(productId);

  const result = await query(
    `UPDATE products 
     SET ${fields.join(', ')} 
     WHERE id = $${paramIndex} 
     RETURNING id, name, description, image_url, category_id, created_at, updated_at`,
    values
  );

  if (result.rows.length === 0) {
    throw new Error('Product not found');
  }

  const product = result.rows[0];
  const categoryResult = await query(
    'SELECT slug, name FROM categories WHERE id = $1',
    [product.category_id]
  );

  const category = categoryResult.rows[0];

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    image_url: product.image_url,
    category_id: product.category_id,
    created_at: product.created_at,
    updated_at: product.updated_at,
    category: {
      slug: category.slug,
      name: category.name,
    }
  };
}

/**
 * Get all products with category information
 */
export async function getAllProducts(): Promise<Product[]> {
  const result = await query(
    `SELECT p.id, p.name, p.description, p.image_url, p.category_id, 
            p.created_at, p.updated_at, c.slug, c.name as category_name
     FROM products p 
     JOIN categories c ON p.category_id = c.id 
     ORDER BY p.created_at DESC`
  );

  return result.rows.map((product: any) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    image_url: product.image_url,
    category_id: product.category_id,
    created_at: product.created_at,
    updated_at: product.updated_at,
    category: {
      slug: product.slug,
      name: product.category_name,
    }
  }));
}

/**
 * Delete a product
 */
export async function deleteProduct(productId: string): Promise<Product> {
  const result = await query(
    `DELETE FROM products WHERE id = $1 RETURNING *`,
    [productId]
  );

  if (result.rows.length === 0) {
    throw new Error('Product not found');
  }

  return result.rows[0];
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(slug: string) {
  const result = await query(
    `SELECT c.id, c.slug, c.name, c.created_at, c.updated_at, 
            COUNT(p.id) as product_count
     FROM categories c 
     LEFT JOIN products p ON c.id = p.category_id 
     WHERE c.slug = $1 
     GROUP BY c.id, c.slug, c.name, c.created_at, c.updated_at`,
    [slug]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const category = result.rows[0];
  return {
    id: category.id,
    slug: category.slug,
    name: category.name,
    created_at: category.created_at,
    updated_at: category.updated_at,
    _count: {
      products: parseInt(category.product_count)
    }
  };
}

/**
 * Create a new category
 */
export async function createCategory(slug: string, name: string): Promise<Category> {
  const result = await query(
    'INSERT INTO categories (slug, name) VALUES ($1, $2) RETURNING *',
    [slug, name]
  );

  return result.rows[0];
}

/**
 * Get category by ID
 */
export async function getCategoryById(categoryId: string): Promise<Category | null> {
  const result = await query(
    'SELECT * FROM categories WHERE id = $1',
    [categoryId]
  );

  return result.rows[0] || null;
}
