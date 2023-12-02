import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "redux/modules/authSlice";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");

    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default LogOut;
