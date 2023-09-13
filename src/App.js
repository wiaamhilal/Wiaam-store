import {Route, Routes} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import {useEffect} from "react";
import {auth} from "./firebase";
import {useShopingCard} from "./components/GlobalState";
import Basket from "./components/Basket";
import CheckOut from "./components/CheckOut";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Orders from "./components/Orders";

function App() {
  const stripePromise = loadStripe(
    "pk_test_51NorSZDa8nKTbSvc9ZE2rcoo39MHJM8PIqANgvs4pBJC32g8HGslUJ5Xwc0UtSq2PSJC7KzY1kPVCGNo3vUEgHKD000Q9i15bM"
  );
  const {dispatch} = useShopingCard();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route path="*" element={<h1>page not found</h1>} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/basket"
          element={
            <>
              <Header /> <Basket />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Header />{" "}
              <Elements stripe={stripePromise}>
                <CheckOut />{" "}
              </Elements>
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <Header />
              <Orders />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
