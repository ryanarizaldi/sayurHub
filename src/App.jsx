import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from "./components/footer/footer";
import "./App.css";
<<<<<<< Updated upstream
import Nav from "./components/navbar/Navbar";

=======
import Navbar from './components/navbar/Navbar';
// import Product from "./components/Home/product";
>>>>>>> Stashed changes

function App() {
  return (
    <div>
    <Router>
      <Switch>
<<<<<<< Updated upstream
=======
		    <Route exact path="/">
          <Navbar />
          <Homepage />
        </Route>
>>>>>>> Stashed changes
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
