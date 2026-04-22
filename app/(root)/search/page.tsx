import Pagination from '@/components/shared/pagination';
import ProductCard from '@/components/shared/product/product-card';
import { Button } from '@/components/ui/button';
import {
  getAllCategories,
  getAllProducts,
} from '@/lib/actions/product.actions';
import Link from 'next/link';

const SearchPage = () => {
  return (
    <>
      <h1>Search Page</h1>
    </>
  );
};

export default SearchPage;