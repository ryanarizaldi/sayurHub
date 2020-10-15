import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from "./components/footer/footer";
import "./App.css";
import Nav from "./components/navbar/Navbar";


function App() {
  return (
    <div>
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
