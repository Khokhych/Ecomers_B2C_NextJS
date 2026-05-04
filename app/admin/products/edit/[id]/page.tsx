import { Metadata } from 'next';
import { requireAdmin } from '@/lib/auth-guard';
import ProductForm from '@/components/shared/admin/product-form';
import { getProductById } from '@/lib/actions/product.actions';
import { Product } from '@/types';

export const metadata: Metadata = {
  title: 'Edit product',
};

const AdminProductEdit = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  await requireAdmin();
  const { id } = await props.params;
  const product = await getProductById(id) as Product;

  return (
    <div>
      <h1 className='h2-bold mb-4'>Edit product: {id}</h1>
      <ProductForm productId={id} type="Update" product={product} />
    </div>
  );
};

export default AdminProductEdit;