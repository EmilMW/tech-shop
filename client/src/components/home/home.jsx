import React from "react";
import Logo from "../../images/logo.png";
import "./home.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div id="home">
      <div className="hero">
        <div className="innerDiv">
          <h1 className="shopName">
            <strong>TECHSHOP</strong>
          </h1>
          <img className="logo" src={Logo} alt="logo" />
          <h3>Welcome Guest! please enjoy browsing our shop</h3>
          <h4>To purchase the amazing products we provide, please create a TechShop account...</h4>
          <div className="signuplink">
            <Link to={"/signup"}>Sign Up Here!</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
