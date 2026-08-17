import { NextRequest, NextResponse } from 'next/server';
import { deleteProduct } from '@/lib/products';
import { requireApiToken } from '@/lib/apiToken';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireApiToken(request);
  if (authError) return authError;
  try {
    const { id: productId } = await params;

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    await deleteProduct(productId);

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
