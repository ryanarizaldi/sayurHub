import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import ProductDets from './pages/ProductDetailPage';
import Homepage from './pages/Homepage';
import "./App.css";
<<<<<<< HEAD
import Cart from './pages/Cart';
=======
// import Product from "./components/Home/product";
>>>>>>> 0ada6a2caf57ceb01e4b24a282c3858725f9c1dd

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
<<<<<<< HEAD
		<Route path="/cart">
          <Cart />
=======
        <Route path="/product_detail">
          <ProductDets />
>>>>>>> 0ada6a2caf57ceb01e4b24a282c3858725f9c1dd
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
