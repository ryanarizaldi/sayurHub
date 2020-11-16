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
import Footer from "./components/footer/footer";
import NotFound from './pages/404pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Navbar />
          <Homepage />
		  <Footer />
        </Route>
        <Route path="/login/admin">
          <AdminLogin />
		  <Footer />
        </Route>
        <Route path="/login">
          <Login />
		  <Footer />
        </Route>
        <Route path="/register">
          <Register />
		  <Footer />
        </Route>
        <Route path="/cart">
          <Navbar />
          <Cart />
		  <Footer /> 
		</Route>
        <Route path="/product/:id?/review">
          <Navbar />
          <Detail />
		  <Footer />
        </Route>
		<Route path="/product/:id?/discussion">
          <Navbar />
          <Detail />
		  <Footer />
        </Route>
        <Route path="/dashboard/admin">
          <Navbar />
          <AdminDash />
		  <Footer />
        </Route>
        <Route path="/dashboard">
          <Navbar />
          <User />
		  <Footer />
        </Route>
        <Route path="/search/:keyword?">
          <Navbar />
          <Search />
		  <Footer />	
        </Route>
		<Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;