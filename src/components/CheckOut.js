import React from "react";
import { useShopingCard } from "./GlobalState";
import BasketProduct from "./BasketProduct";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { GetBasketTotal } from "./AppReducer";
import "./checkOut.css";

const CheckOut = () => {
  const { basket } = useShopingCard();
  return (
    <div className="checkout">
      <Link
        to="/basket"
        className="d-flex align-items-center justify-content-center"
        style={{
          height: "60px",
          backgroundColor: "#eee",
          textDecoration: "none",
          color: "black",
        }}
      >
        <h1>checkout({basket.length} items)</h1>
      </Link>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #eee",
        }}
        className="p-4 address-holder"
      >
        <span className="fw-bold address-title">Delivery address</span>
        <span className="address-text">alsafa 2 almedhwar restorent</span>
      </div>
      <div className="p-4">
        <span
          className="mb-4"
          style={{ fontSize: "20px", fontWeight: "bold", display: "block" }}
        >
          Review items and delivrey
        </span>
        <div className="my-holder">
          {basket.map((item) => (
            <BasketProduct {...item} />
          ))}
        </div>
        <div
          style={{ height: "100px", borderTop: "1px solid #ccc" }}
          className="p-4 d-flex mb-4"
        >
          <span
            className="col-md-2 Payment-method "
            style={{ fontWeight: "bold" }}
          >
            Payment method
          </span>
          <form className="w-100">
            <span>card:</span>
            <div
              className="card-method"
              style={{
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              order total :{" "}
              {
                <CurrencyFormat
                  value={GetBasketTotal(basket)}
                  displayType="text"
                  thousandSeparator={true}
                  decimalScale={2}
                  prefix="$"
                />
              }
            </div>
            <button className="btn btn-warning w-100">Buy Now</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
