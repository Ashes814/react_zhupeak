import React from "react";
import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      Layout
      <Link to="/">Board</Link>
      <Link to="/about">About</Link>
      <Outlet />
    </div>
  );
};
