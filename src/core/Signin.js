import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import firebase from "firebase";
require("firebase/auth");

function Signin() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  function handleLogin(event) {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        alert("Sign in success");
        return data.user
      })
      .then((user) => {
        window.localStorage.setItem("userEmail",user.email);
        window.location="/profile";
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }
  function handleChange(event) {
    const target = event.target;
    const name = target.name;
    console.log(name);
    if (name === "inputEmail") {
      setEmail(target.value);
    } else if (name === "inputPassword") {
      setPassword(target.value);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 className="display-4">
          So<span className="text-success">P</span>
          <span className="text-warning">R</span>
          <span className="text-danger">O</span>
        </h1>
        <div className="container">
          <h4>Let's get you signed in!</h4>
          <img
            height="50px"
            className="poppergif"
            src="https://media.tenor.com/images/84fd3bdacf65d4306ead414fcf2a16f6/tenor.gif"
            alt="Welcome GIF"
          />
        </div>
      </div>
      <div className="container p-3 form">
        <form className="form-signin">
          <div className="form-label-group">
            <input
              type="email"
              name="inputEmail"
              id="inputEmail"
              className="form-control"
              placeholder="Email address"
              value={email}
              onChange={handleChange}
              required=""
            />
            <label htmlFor="inputEmail">Email address</label>
          </div>

          <div className="form-label-group">
            <input
              type="password"
              id="inputPassword"
              name="inputPassword"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              required=""
            />
            <label htmlFor="inputPassword">Password</label>
          </div>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button
            className="btn btn-lg btn-primary btn-block"
            onClick={handleLogin}
          >
            Sign in
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Signin;
