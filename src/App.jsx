import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import ProductDets from './pages/ProductDetailPage';
import Dashboard from './pages/DashboardPage';
import Homepage from './pages/Homepage';
import "./App.css";
// import Product from "./components/Home/product";

function App() {
  return (
    <Router>
      <Switch>
		    <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/product_detail">
          <ProductDets />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
