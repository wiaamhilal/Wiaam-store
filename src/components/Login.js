import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/wiaam logo.jpg";
import "./Login.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
const Login = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const navicate = useNavigate();
  const Register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          navicate("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          navicate("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div
      style={{
        flexDirection: "column",
        margin: "auto",
        height: "100vh",
      }}
      className="d-flex align-items-center justify-content-center"
    >
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <div className="shadow-lg p-3" style={{ maxWidth: "300px" }}>
        <h1>sign in</h1>
        <form>
          <h6>Email</h6>
          <input
            type="text"
            className="w-100"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <h6 className="mt-1">Password</h6>
          <input
            type="password"
            className="w-100 mb-3"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button className="btn btn-warning w-100" onClick={signIn}>
            sign in{" "}
          </button>
          <p className="mt-2 text-secondary" style={{ fontSize: "13px" }}>
            wellcome to wiaam Hilal page thank you for apply to our aplcation
          </p>
          <button className="btn btn-secondary w-100" onClick={Register}>
            create your wiaam acount
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
