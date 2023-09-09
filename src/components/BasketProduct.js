import React from "react";
import star from "../img/star.png";
import { useShopingCard } from "./GlobalState";
import "./BasketProduct.css";
const BasketProduct = ({ id, title, imgSrc, price, rate }) => {
  const { dispatch } = useShopingCard();
  const RemoveFromBasket = () => {
    dispatch({
      type: "REMOVE_ITEM",
      id: id,
    });
  };
  return (
    <div className="BasketProduct shadow mb-3 rounded position-relative">
      <div className="d-flex main-div">
        <img
          className="me-4 img-pro"
          src={imgSrc}
          alt="product"
          style={{ objectFit: "contain" }}
        />
        <div>
          <p className="fw-bold title">{title}</p>
          <p className="fw-bold price">$ {price}</p>
          <div className="star">
            {Array(rate)
              .fill()
              .map((_, i) => (
                <img src={star} alt="star" className="star-img" style={{}} />
              ))}
          </div>
          <button
            className="btn btn-warning btn-sm my-btn position-absolute"
            onClick={RemoveFromBasket}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasketProduct;
