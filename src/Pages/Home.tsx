import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

const Home = () => {
  return (
    <div className="layout">
      <Header />
      <Outlet />
    </div>
  );
};

export default Home;