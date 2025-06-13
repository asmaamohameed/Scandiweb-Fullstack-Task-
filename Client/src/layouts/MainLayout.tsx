import { Outlet } from "react-router-dom";
import Header from "../components/Header";

type Category = {
  name: string;
};

const MainLayout = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="layout relative">
      <Header categories={categories} />
      <Outlet />
    </div>
  );
};
export default MainLayout;
