import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "./graphql/queries";
import Loading from "./components/fallbacks/Loading";
import ErrorPage from "./components/fallbacks/ErrorPage";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

const App = () => {
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  if (loading) return <Loading />;
  if (error)
    return (
      <ErrorPage message="Failed to fetch products from server. Please check your connection." />
    );
  const route = router(data?.categories || []);
  return <RouterProvider router={route} />;
};

export default App;
