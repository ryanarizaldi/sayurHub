import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import AdminLogin from "./pages/AdminLoginPage";
import Register from "./pages/RegisterPage";
import Homepage from "./pages/Homepage";
import "./App.css";
import Cart from "./pages/Cart";
import User from "./pages/DashboardPage";
import AdminDash from "./pages/AdminDashboard";
import Detail from "./pages/ProductDetailPage";
import Search from "./pages/SearchPage";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Navbar />
          <Homepage />
        </Route>
        <Route path="/login/admin">
          <AdminLogin />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/cart">
          <Navbar />
          <Cart />
        </Route>
        <Route path="/product/:id?">
          <Navbar />
          <Detail />
        </Route>
        <Route path="/dashboard/admin">
          <Navbar />
          <AdminDash />
        </Route>
        <Route path="/dashboard">
          <Navbar />
          <User />
        </Route>
        <Route path="/search/:keyword?">
          <Navbar />
          <Search />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
