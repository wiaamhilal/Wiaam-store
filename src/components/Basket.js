import React from "react";
import "./Basket.css";
import {useShopingCard} from "./GlobalState";
import BasketProduct from "./BasketProduct";
import imgChickOut from "../img/checkoutAd.jpg";
import CurrencyFormat from "react-currency-format";
import {GetBasketTotal} from "./AppReducer";
import {useNavigate} from "react-router-dom";

const Basket = () => {
  const {user, basket} = useShopingCard();
  const navicate = useNavigate();
  return (
    <div className="Basket">
      <div className="p-4 d-flex my-con">
        <div className="col-md-9">
          <img
            src={imgChickOut}
            alt="ad"
            className="w-100 addd"
            style={{height: "80px"}}
          />
          <h2 className="m-3">Hello, {user ? `${user.email}` : "Guiest"}</h2>
          <h3 className="mb-3">your shoping basket</h3>
          <div className="">
            {basket.map((item) => (
              <BasketProduct {...item} />
            ))}
          </div>
        </div>
        <div
          className="col-md-3 p-3 text-center bg-light rounded"
          style={{height: "150px"}}
        >
          <CurrencyFormat
            renderText={(value) => (
              <>
                <p>
                  subtotal ( {basket.length} item ) :{" "}
                  <span className="fw-bold">{value}</span>
                </p>
                <div>
                  <input type="checkbox" className="me-2" id="dis" />{" "}
                  <label for="dis" style={{cursor: "pointer"}}>
                    this order contain a gift
                  </label>
                </div>
                <button
                  className="btn btn-warning w-100 mt-3"
                  onClick={() => navicate("/checkout")}
                >
                  proceed to checkout
                </button>
              </>
            )}
            value={GetBasketTotal(basket)}
            displayType="text"
            decimalScale={2}
            thousandSeparator={true}
            prefix="AED "
          />
        </div>
      </div>
    </div>
  );
};

export default Basket;
