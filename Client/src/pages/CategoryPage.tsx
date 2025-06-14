import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/queries";
import Loading from "../components/fallbacks/Loading";
import ErrorPage from "../components/fallbacks/ErrorPage";
import ProductCard from "../components/product/ProductCard";

const CategoryPage = ({ category }: { category: string }) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { category },
  });
  if (loading) return <Loading />;
  if (error)
    return (
      <ErrorPage message="Failed to fetch products from server. Please check your connection." />
    );
  const filteredProducts = data?.products ?? [];

  return (
    <div className="container max-w-[1400px] mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-semibold mb-8 capitalize">{category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 h-1/3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-600">
            No products available in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
