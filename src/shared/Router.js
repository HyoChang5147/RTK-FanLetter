import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="detail/:id" element={<Detail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
