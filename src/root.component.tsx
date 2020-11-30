import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./home.component";

export default function Root() {
  return (
    <BrowserRouter basename={window["getOpenmrsSpaBase"]()}>
      <Route path="/home" component={Home} />
    </BrowserRouter>
  );
}
