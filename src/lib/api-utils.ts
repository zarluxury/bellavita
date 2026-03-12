import { NextRequest, NextResponse } from 'next/server';

export interface ApiError {
  error: string;
  details?: string;
  code?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

/**
 * Create a standardized error response
 */
export function createErrorResponse(
  message: string, 
  status: number = 500, 
  details?: string
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        error: message,
        details,
        code: status.toString()
      }
    },
    { status }
  );
}

/**
 * Create a standardized success response
 */
export function createSuccessResponse<T>(
  data: T, 
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data
    },
    { status }
  );
}

/**
 * Validate file upload
 */
export function validateFileUpload(file: File | null): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: true }; // File is optional
  }

  // Check file size (10MB max)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return { 
      valid: false, 
      error: 'File size too large. Maximum size is 10MB.' 
    };
  }

  // Check file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' 
    };
  }

  return { valid: true };
}

/**
 * Validate product form data
 */
export function validateProductFormData(formData: FormData): { 
  valid: boolean; 
  error?: string;
  data?: {
    name: string;
    description: string;
    categorySlug: string;
    image: File | null;
  };
} {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const categorySlug = formData.get('categorySlug') as string;
  const image = formData.get('image') as File;

  // Validate required fields
  if (!name || name.trim().length === 0) {
    return { 
      valid: false, 
      error: 'Product name is required.' 
    };
  }

  if (name.length > 200) {
    return { 
      valid: false, 
      error: 'Product name must be less than 200 characters.' 
    };
  }

  if (!categorySlug || categorySlug.trim().length === 0) {
    return { 
      valid: false, 
      error: 'Category is required.' 
    };
  }

  if (description && description.length > 2000) {
    return { 
      valid: false, 
      error: 'Description must be less than 2000 characters.' 
    };
  }

  // Validate image if provided
  const imageValidation = validateFileUpload(image);
  if (!imageValidation.valid) {
    return imageValidation;
  }

  return {
    valid: true,
    data: {
      name: name.trim(),
      description: description?.trim() || '',
      categorySlug: categorySlug.trim(),
      image: image && image.size > 0 ? image : null
    }
  };
}

/**
 * Handle async errors in API routes
 */
export function handleApiError(error: unknown, context: string): NextResponse<ApiResponse> {
  console.error(`Error in ${context}:`, error);
  
  if (error instanceof Error) {
    return createErrorResponse(
      error.message,
      500,
      context
    );
  }
  
  return createErrorResponse(
    'An unexpected error occurred',
    500,
    context
  );
}

/**
 * Rate limiting helper (simple in-memory implementation)
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string, 
  limit: number = 10, 
  windowMs: number = 60000 // 1 minute
): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    // Create new record or reset existing
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    });
    return { allowed: true };
  }

  if (record.count >= limit) {
    return { 
      allowed: false, 
      resetTime: record.resetTime 
    };
  }

  // Increment count
  record.count++;
  return { allowed: true };
}

/**
 * Sanitize user input
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 1000); // Limit length
}
