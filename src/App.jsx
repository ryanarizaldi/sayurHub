import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Homepage from './pages/Homepage';
import "./App.css";
import Cart from './pages/Cart';
import User from './pages/DashboardPage';

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
		<Route path="/cart">
          <Cart />
        </Route>
		<Route path="/dashboard">
			<User />  
		</Route>
      </Switch>
    </Router>
  );
}

export default App;
