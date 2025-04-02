import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

const MainLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="layout relative">
      {/* Header (Always Visible) */}
      <Header isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />

      {/* Wrapper for Content & Overlay */}
      <div className="relative">
        {/* Overlay covering content after the header */}
        {isCartOpen && (
          <div
            className="absolute inset-0 bg-black opacity-50 z-10"
            onClick={() => setIsCartOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="relative z-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
