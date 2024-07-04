import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Menu from "../pages/Menu";
import Orders from "../pages/order";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}></Route>
          <Route path="/menu" element={<Home />}></Route>
          <Route path="/order" element={<Orders />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
