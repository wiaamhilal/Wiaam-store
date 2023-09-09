import React from "react";
import HomeImg from "../img/home.jpg";
import Products from "../Products.json";
import "./Home.css";
import Product from "./Product";

const Home = () => {
  return (
    <div className="Home">
      <img className="Home-img" src={HomeImg} alt="background" />
      <div className="row">
        {Products.map((item) => (
          <div className="col-sm-6 col-lg-3 col-md-4">
            <Product {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
