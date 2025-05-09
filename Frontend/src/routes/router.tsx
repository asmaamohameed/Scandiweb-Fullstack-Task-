import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CategoryPage from "../Pages/CategoryPage";
import ProductPage from "../Pages/ProductPage";
import ErrorPage from "../Components/Fallbacks/ErrorPage";

type Category = { name: string };

const router = (categories: Category[]) =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout categories={categories} />}>
        <Route index element={<CategoryPage category="all" />} />
        {categories.map((category) => (
          <Route
            key={category.name}
            path={category.name.toLowerCase()}
            element={<CategoryPage category={category.name} />}
          />
        ))}
        <Route path="*" element={<ErrorPage />} />
        <Route path="product/:id" element={<ProductPage />} />
      </Route>
    )
  );

export default router;
