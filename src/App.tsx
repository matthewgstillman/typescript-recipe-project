import React, { FC, FunctionComponent } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RandomRecipe from "./components/RandomRecipe";
import MealPlanner from "./components/MealPlanner";
import "bootstrap/dist/css/bootstrap.min.css";

export interface IApplicationProps {}

const App: FunctionComponent<IApplicationProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RandomRecipe />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
