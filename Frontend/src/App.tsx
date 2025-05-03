import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "./GraphQL/queries"; // Make sure the query exists
import Loading from './Components/Fallbacks/Loading';
import ErrorPage from './Components/Fallbacks/ErrorPage';
import { RouterProvider } from "react-router-dom";
import router from "./routes/router"; 

const App = () => {
    const { data, loading, error } = useQuery(GET_CATEGORIES);
  
    if (loading) return <Loading />;  
    if (error) return <ErrorPage message="Failed to fetch products from server. Please check your connection." />;
  
  
    const categories = data?.categories;
    const route = router(categories);
  
  return (
      <RouterProvider router={route} />
  );
};

export default App;