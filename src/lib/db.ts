import { Pool } from 'pg';

// Database connection pool with enhanced configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Test database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export { pool };

// Helper function to execute queries with retry logic
export async function query(text: string, params?: any[], retries = 2): Promise<any> {
  const start = Date.now();
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await pool.query(text, params);
      const duration = Date.now() - start;
      console.log('Executed query', { text, duration, rows: res.rowCount, attempt });
      return res;
    } catch (error: any) {
      console.error(`Database query error (attempt ${attempt}/${retries})`, { text, error: error.message });
      
      // If this is the last attempt or a fatal error, throw
      if (attempt === retries || error.code === '42703' || error.code === '42P01') {
        throw error;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
}

// Database initialization
export async function initializeDatabase() {
  try {
    // Enable UUID extension
    await query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    // Create tables if they don't exist
    await query(`
      CREATE TABLE IF NOT EXISTS categories (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        slug VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(name, category_id)
      );
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) UNIQUE NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS contact_forms (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        automation_for VARCHAR(100),
        project_type VARCHAR(100),
        contact_number VARCHAR(20),
        city VARCHAR(100),
        details TEXT,
        services TEXT[],
        ip VARCHAR(45),
        user_agent TEXT,
        status VARCHAR(20) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS get_in_touch (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        organization VARCHAR(255),
        inquiry_type VARCHAR(100),
        message TEXT,
        ip VARCHAR(45),
        user_agent TEXT,
        status VARCHAR(20) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes
    await query(`CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_newsletter_timestamp ON newsletter_subscriptions(timestamp);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_contact_forms_created_at ON contact_forms(created_at);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_contact_forms_status ON contact_forms(status);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_get_in_touch_created_at ON get_in_touch(created_at);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_get_in_touch_status ON get_in_touch(status);`);

    // Create updated_at trigger function
    await query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    // Create triggers for updated_at
    await query(`
      DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
      CREATE TRIGGER update_categories_updated_at 
        BEFORE UPDATE ON categories 
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);

    await query(`
      DROP TRIGGER IF EXISTS update_products_updated_at ON products;
      CREATE TRIGGER update_products_updated_at 
        BEFORE UPDATE ON products 
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// Close pool when app is shutting down
process.on('SIGINT', async () => {
  await pool.end();
  console.log('Database pool closed');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await pool.end();
  console.log('Database pool closed');
  process.exit(0);
});
