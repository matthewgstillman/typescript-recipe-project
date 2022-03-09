import React, { FC, FunctionComponent } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import RandomRecipe from "./Pages/RandomRecipe";
import MealPlanner from "./Pages/MealPlanner";
import "bootstrap/dist/css/bootstrap.min.css";

export interface IApplicationProps {}

const App: FunctionComponent<IApplicationProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/random" element={<RandomRecipe />} />
        <Route path="/mealplanner" element={<MealPlanner />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
