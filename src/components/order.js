import React from "react";
import moment from "moment/moment";
import BasketProduct from "./BasketProduct";
import "./order.css";

const order = ({order}) => {
  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h3 className="my-info-order">order time:</h3>
        <h4 className="text-secondary my-info-order">
          {" "}
          {moment.unix(order.data.created).format("MMMM DD YYYY h:mma")}
        </h4>
      </div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h3 className="my-info-order">order id:</h3>
        <h5 className="text-secondary my-info-order">{order.id}</h5>
      </div>
      <div>
        {order.data.basket.map((item) => (
          <BasketProduct {...item} hiddenButton />
        ))}
      </div>
    </div>
  );
};

export default order;
