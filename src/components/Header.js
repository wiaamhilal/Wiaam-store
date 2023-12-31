import React, {useState} from "react";
import {Link} from "react-router-dom";
import logo from "../img/wiaam logo.jpg";
import "./Header.css";
import {useShopingCard} from "./GlobalState";
import {auth} from "../firebase";
import {useSelector} from "react-redux";
const Header = ({setserch}) => {
  const handleSignOut = () => {
    auth.signOut();
  };
  const {basket} = useShopingCard();
  const {userRedux} = useSelector((state) => state.UserSlice);
  return (
    <div className="Header d-flex sticky-top">
      <div className="firstt d-flex align-items-center">
        <Link to="/Basket" className="card-item">
          <span>
            <img
              className="card-logo"
              alt="card"
              src="https://t4.ftcdn.net/jpg/01/86/94/37/360_F_186943704_QJkLZaGKmymZuZLPLJrHDMUNpAwuHPjY.jpg"
            />
          </span>
          <span className="numper">{basket?.length}</span>
        </Link>
        <div className="input-div">
          <input
            className="input-text"
            type="text"
            onChange={(e) => setserch(e.target.value)}
          />
          <img
            src="https://icon-library.com/images/search-icon-white/search-icon-white-16.jpg"
            className="serch bg-warning"
            alt="icon"
          />
        </div>
      </div>
      <div className="secondd d-flex align-items-center">
        <Link className="main" to="/login" onClick={handleSignOut}>
          <div className="first">
            Hello {userRedux ? `${userRedux.email}` : "geust"}
          </div>
          <div className="second">{userRedux ? "sign out" : "sign in"}</div>
        </Link>
        <Link className="main" to="/orders">
          <div className="first">retums</div>
          <div className="second">& orders</div>
        </Link>
        <div className="main">
          <div className="first">your</div>
          <div className="second">prime</div>
        </div>
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
