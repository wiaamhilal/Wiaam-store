import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useShopingCard } from "./components/GlobalState";
import Basket from "./components/Basket";
import CheckOut from "./components/CheckOut";

function App() {
  const { dispatch } = useShopingCard();
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
              <Header /> <CheckOut />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
