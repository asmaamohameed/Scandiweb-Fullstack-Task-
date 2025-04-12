import { RouterProvider } from "react-router-dom";
import router from "./routes/index";
import Providers from "./Providers/Providers";

const App = () => {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};

export default App;
