import { createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CategoryPage from "../Pages/CategoryPage";
import ProductPage from "../Pages/ProductPage";
import ErrorPage from '../Components/Fallbacks/ErrorPage';


  const router = (categories: { name: string }[]) =>
   createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<CategoryPage category="all" />} />
        {categories.map((category) => (
          <Route
            key={category.name}
            path={category.name.toLowerCase()}
            element={<CategoryPage category={category.name} />}
          />
        ))}
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="*" element={<ErrorPage message="Page not found 😕" />} />

      </Route>
    )
  );

export default router;