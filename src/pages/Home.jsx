import React, { useEffect } from "react";
import Input from "components/Input";
import MemberButton from "components/MemberButton";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FanLetterList from "components/FanLetterList";

function Home() {
  const navigate = useNavigate();
  const notify = (message) => toast(message);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const loginSuccess = localStorage.getItem("loginSuccess");

    if (loginSuccess) {
      notify("로그인 성공!");
      localStorage.removeItem("loginSuccess");
    }
    // if (!userData.accessToken) {
    //   navigate("login");
    // }
  }, [navigate]);

  return (
    <>
      <div>
        <MemberButton />
        <Input />
        <FanLetterList />
      </div>
      <ToastContainer />
    </>
  );
}

export default Home;
