import AppRouter from "./routes/AppRouter";
import Providers from "./Providers/Providers";

const App = () => {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
};

export default App;
