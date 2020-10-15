import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Footer from "./components/footer/footer";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
