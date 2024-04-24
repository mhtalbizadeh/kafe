import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Menu from "../pages/Menu";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}></Route>
          <Route path="/menu" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
