import { Component } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

class MainLayout extends Component {
  render() {
    return (
      <div className="layout relative">
        <Header />
        <Outlet />
      </div>
    );
  }
}
export default MainLayout;
