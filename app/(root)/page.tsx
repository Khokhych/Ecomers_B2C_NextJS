export const metadata = {
  title: "Home",
}
import IconBoxes from '@/components/icon-boxes';
import ProductList from "@/components/shared/product/product-list";
import ViewAllProductsButton from "@/components/shared/view-all-products-button";
import {
  getFeaturedProductsWithBanner,
  getLatestProducts,
} from '@/lib/actions/product.actions';
import ProductCarousel from '@/components/shared/product/product-carousel';

const  Homepage = async () => {
  const featuredProducts = await getFeaturedProductsWithBanner();
  const latestProducts = await getLatestProducts();

  return (
    <>
      <ProductCarousel data={featuredProducts} />
      <ProductList title='Newest Arrivals' data={latestProducts} limit={4} />
      <ViewAllProductsButton />
      <IconBoxes />
    </>
  );
}

export default Homepage;
