import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Homepage from "./pages/Homepage";
import "./App.css";
import Cart from "./pages/Cart";
import User from "./pages/DashboardPage";
import Detail from "./pages/ProductDetailPage";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/login">
          <Login />
          <Footer />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/product/:id?">
          <Detail />
        </Route>
        <Route path="/dashboard">
          <User />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
