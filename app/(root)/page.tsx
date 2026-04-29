export const metadata = {
  title: "Home",
}
import ProductList from "@/components/shared/product/product-list";
import ViewAllProductsButton from "@/components/shared/view-all-products-button";
import {getLatestProducts} from "@/lib/actions/product.actions";

const  Homepage = async () => {
  const products = await getLatestProducts();

  return (
    <>
      <ProductList title='Newest Arrivals' data={products} limit={4} />
      <ViewAllProductsButton />
    </>
  );
}

export default Homepage;
