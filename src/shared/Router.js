import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Login from "pages/Login";
import Layout from "./Layout";
import MyProfile from "pages/MyProfile";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/myprofile/:id" element={<MyProfile />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
