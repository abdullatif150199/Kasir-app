import React, { Component } from "react";
import "./App.css";
import Home from "./pages/Home";
import Sukses from "./pages/Sukses";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <NavbarComponent />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/sukses" element={<Sukses />} />
          </Routes>
        </BrowserRouter>
        {/* <Home /> */}
      </div>
    );
  }
}

export default App;
