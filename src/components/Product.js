import React, {useEffect} from "react";
import star from "../img/star.png";
import "./Product.css";
import {useShopingCard} from "./GlobalState";

const Product = ({id, title, imgSrc, rate, price}) => {
  const {dispatch, basket} = useShopingCard();
  const AddToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        imgSrc: imgSrc,
        rate: rate,
        price: price,
      },
    });
  };
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);
  return (
    <div className="product shadow position-relative">
      <p className="title">{title}</p>
      <p className="price">AED {price}</p>
      <div className="star">
        {Array(rate)
          .fill()
          .map((_, i) => (
            <img src={star} alt="star" className="star-img" />
          ))}
      </div>
      <img src={imgSrc} className="product-img" alt="img" />
      <div className="d-flex justify-content-center mt-2">
        <button
          className="btn btn-warning mt-3 bbbtttn position-absolute"
          onClick={AddToBasket}
        >
          Add to basket
        </button>
      </div>
    </div>
  );
};

export default Product;
