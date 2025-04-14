import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectRoutes = () => {
  const navigate = useNavigate();
  const { isUserAuth } = useSelector((state) => state.user);
 
  if (!isUserAuth) {
    navigate("/");
  }
  return isUserAuth && <Outlet />;
};

export default ProtectRoutes;
