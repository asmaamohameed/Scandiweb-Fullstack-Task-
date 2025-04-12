import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CategoryPage from "../Pages/CategoryPage";
import ProductPage from "../Pages/ProductPage";
import localData from "../data.json";

const GenerateRoutes = () => {
  const categories = localData.data.categories;

  return createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      {categories.map((category: { name: string }) => (
        <Route
          key={category.name}
          path={category.name.toUpperCase()}
          element={<CategoryPage category={category.name} />}
        />
      ))}
      <Route path="product/:id" element={<ProductPage />} />
    </Route>
  );
};

const router = createBrowserRouter(GenerateRoutes());

export default router;

// import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
// import { useQuery } from "@apollo/client";
// import localData from "../data.json";
// import { GET_CATEGORIES } from "../GraphQL/Queries";

// const GenerateRoutes = (categories: { name: string }[]) => {
//   return createBrowserRouter(
//     createRoutesFromElements(
//       <Route path="/" element={<MainLayout />}>
//         {categories.map((category) => (
//           <Route key={category.name} path={category.name.toLowerCase()} element={<div>{category.name}</div>} />
//         ))}
//       </Route>
//     )
//   );
// };

// const Router = () => {
//   const { data, loading, error } = useQuery(GET_CATEGORIES);

//   if (loading) return <p>Loading...</p>;
//   if (error) {
//     console.error("GraphQL Error:", error);
//     return <p>Error loading categories</p>;
//   }
//   if (error) return <p>Error loading categories</p>;

//   const categories = data?.categories || localData.data.categories;
//   const router = GenerateRoutes(categories);

//   return <RouterProvider router={router} />;
// };

// export default Router;
