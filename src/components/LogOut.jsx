import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __logoutUser } from "redux/modules/authSlice";
import styled from "styled-components";

function LogOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(__logoutUser());
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <div>
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </div>
  );
}

export default LogOut;

const LogoutButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #f44336;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d32f2f;
  }
`;
