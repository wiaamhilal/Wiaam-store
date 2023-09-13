import React, {useEffect, useState} from "react";
import {useShopingCard} from "./GlobalState";
import BasketProduct from "./BasketProduct";
import {Link, useNavigate} from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import {GetBasketTotal} from "./AppReducer";
import "./checkOut.css";
import {CardElement, useStripe} from "@stripe/react-stripe-js";
import axios from "./axios";
import {useElements} from "@stripe/react-stripe-js";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../firebase";

const CheckOut = () => {
  const navicate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const {basket, user, dispatch} = useShopingCard();
  const [disabled, setdisabled] = useState(true);
  const [clientSecret, setclientSecret] = useState();
  const [prossecing, setprossecing] = useState(false);
  const [eror, seterror] = useState(null);
  const [success, setsuccess] = useState(false);
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${GetBasketTotal(basket) * 100}`,
      });
      setclientSecret(response.data.clientSecret);
      return response;
    };
    getClientSecret();
  }, [basket]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setprossecing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({paymentIntent}) => {
        const ref = doc(db, "users", user?.uid, "orders", paymentIntent.id);
        setDoc(ref, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        setsuccess(true);
        seterror(null);
        setprossecing(false);
        dispatch({
          type: "CLEAR_BASKET",
        });
        navicate("/orders", {replace: true});
      });
  };

  const handleChange = (e) => {
    setdisabled(e.emty);
    seterror(eror ? eror.message : "");
  };
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
          style={{fontSize: "20px", fontWeight: "bold", display: "block"}}
        >
          Review items and delivrey
        </span>
        <div className="my-holder">
          {basket.map((item) => (
            <BasketProduct {...item} />
          ))}
        </div>
        <div
          style={{height: "100px", borderTop: "1px solid #ccc"}}
          className="p-4 d-flex mb-4"
        >
          <span
            className="col-md-2 Payment-method "
            style={{fontWeight: "bold"}}
          >
            Payment method
          </span>
          <form onSubmit={handleSubmit} className="w-100">
            <CardElement className="m-2" onChange={handleChange} />
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
                  prefix="AED "
                />
              }
            </div>
            <button
              disabled={success || disabled || prossecing}
              className="btn btn-warning w-100"
            >
              {prossecing ? "prossecing" : "Buy Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
