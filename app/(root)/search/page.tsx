import Pagination from '@/components/shared/pagination';
import ProductCard from '@/components/shared/product/product-card';
import { Button } from '@/components/ui/button';
import {
  getAllCategories,
  getAllProducts,
} from '@/lib/actions/product.actions';
import Link from 'next/link';

const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $100',
    value: '51-100',
  },
  {
    name: '$101 to $200',
    value: '101-200',
  },
  {
    name: '$201 to $500',
    value: '201-500',
  },
  {
    name: '$501 to $1000',
    value: '501-1000',
  },
];

const sortOrders = ['newest', 'lowest', 'highest'];

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string;
    category: string;
    price: string;
  }>;
}) {
  const {
    q = 'all',
    category = 'all',
    price = 'all',
  } = await props.searchParams;

  const isQuerySet = q && q !== 'all' && q.trim() !== '';
  const isCategorySet = category && category !== 'all' && category.trim() !== '';
  const isPriceSet = price && price !== 'all' && price.trim() !== '';

  if (isQuerySet || isCategorySet || isPriceSet) {
    return {
      title: `Search ${
        isQuerySet ? q : ''
      }
      ${isCategorySet ? `: Category ${category}` : ''}
      ${isPriceSet ? `: Price ${price}` : ''}`,
    };
  } else {
    return {
      title: 'Search Products',
    };
  }
}

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    sort = 'newest',
    page = '1',
  } = await props.searchParams;

  const products = await getAllProducts({
    category,
    query: q,
    price,
    page: Number(page),
    sort,
  });

  // Construct filter url
  const getFilterUrl = ({
    c,
    s,
    p,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, sort, page };
    if (c) params.category = c;
    if (p) params.price = p;
    if (pg) params.page = pg;
    if (s) params.sort = s;
    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const categories = await getAllCategories();

  return (
    <div className='grid md:grid-cols-5 md:gap-5'>
      <div className='md:col-span-1'>
        {/* Category Links */}
        <div>
        <div className='text-xl mt-3 mb-2'>Department</div>
          <ul className='space-y-1'>
            <li>
              <Link
                className={`${
                  ('all' === category || '' === category) && 'font-bold'
                }`}
                href={getFilterUrl({ c: 'all' })}
              >
                Any
              </Link>
            </li>
            {categories.map((x) => (
              <li key={x.category}>
                <Link
                  className={`${x.category === category && 'font-bold'}`}
                  href={getFilterUrl({ c: x.category })}
                >
                  {x.category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {
          /* Price Links */
        }
        <div>
          <div className='text-xl mt-8 mb-2'>Price</div>
          <ul className='space-y-1'>
            <li>
              <Link
                className={`  ${'all' === price && 'font-bold'}`}
                href={getFilterUrl({ p: 'all' })}
              >
                Any
              </Link>
            </li>
            {prices.map((p) => (
              <li key={p.value}>
                <Link
                  href={getFilterUrl({ p: p.value })}
                  className={`${p.value === price && 'font-bold'}`}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='md:col-span-4 space-y-4'>
        <div className='flex-between flex-col md:flex-row my-4'>
          <div className='flex items-center'>
            {q !== 'all' && q !== '' && 'Query : ' + q}
            {category !== 'all' && category !== '' && '   Category : ' + category}
            {price !== 'all' && '    Price: ' + price}
            &nbsp;
            {(q !== 'all' && q !== '') ||
            (category !== 'all' && category !== '') ||
            price !== 'all' ? (
              <Button variant={'link'} asChild>
                <Link href='/search'>Clear</Link>
              </Button>
            ) : null}
          </div>
          <div>Sort by{' '}
            {sortOrders.map((s) => (
              <Link
                key={s}
                className={`mx-2   ${sort == s && 'font-bold'} `}
                href={getFilterUrl({ s })}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
        <div>
          {products.data.length === 0 && <div>No Product Found</div>}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
            {products.data.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <Pagination page={Number(page) || 1} totalPages={products?.totalPages} />
        </div>
      </div>

    </div>
  );
};

export default SearchPage;