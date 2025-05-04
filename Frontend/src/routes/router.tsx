// import { createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CategoryPage from "../Pages/CategoryPage";
// import ProductPage from "../Pages/ProductPage";
import ErrorPage from '../Components/Fallbacks/ErrorPage';
import { createBrowserRouter } from "react-router-dom";


type Category = { name: string };

const router = (categories: Category[]) =>
  createBrowserRouter([
    {
      path: "/",
      element: <MainLayout categories={categories} />,
      errorElement: <ErrorPage />,
      children:[{index: true, element: <CategoryPage category="all" />},
        ...categories.map((category) => ({
        path: category.name.toLowerCase(),
        element: <CategoryPage category={category.name} />,
      })),
      ] 
    },
  ]);

export default router;
