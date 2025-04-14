import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectRoutes = () => {
  const navigate = useNavigate();
  const { isUserAuth } = useSelector((state) => state.user);

  // // useEffect(() => {
  // //   if (!isUserAuth) {
  // //     navigate("/");
  // //   }
  // }, [isUserAuth, navigate]);

  return isUserAuth ? <Outlet /> : null;
};

export default ProtectRoutes;
