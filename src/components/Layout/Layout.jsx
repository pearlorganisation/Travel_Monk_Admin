import React from "react";
import SideBar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <SideBar />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
