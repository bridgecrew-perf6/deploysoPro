import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import firebase from "firebase";
require("firebase/auth");

function Signup() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSignup(event) {
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      return result.user.updateProfile({
        photoURL: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png",
        displayName: name
      })
    })
    .then((user) => {
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        alert("Sign Up Success");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
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
    if (name==="inputName"){
      setName(target.value);
    }
    else if (name === "inputEmail") {
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
          <h4>Let's get you signed up!</h4>
          <img
            height="50px"
            className="poppergif"
            src="https://media.tenor.com/images/ce4e7484ae0727138d035eea8155f600/tenor.gif"
            alt="Party Popper GIF"
          />
        </div>
      </div>
      <div className="container p-3 form">
        <form className="form-signin">

        <div className="form-label-group">
            <input
              name="inputName"
              type="text"
              id="inputName"
              className="form-control"
              placeholder="Your Name"
              required=""
              value={name}
              onChange={handleChange}
            />
            <label htmlFor="inputEmail">Email address</label>
          </div>

          <div className="form-label-group">
            <input
              name="inputEmail"
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Email address"
              required=""
              value={email}
              onChange={handleChange}
            />
            <label htmlFor="inputEmail">Email address</label>
          </div>

          <div className="form-label-group">
            <input
              name="inputPassword"
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              required=""
              value={password}
              onChange={handleChange}
            />
            <label htmlFor="inputPassword">Password</label>
          </div>
          <button onClick={handleSignup} className="btn btn-lg btn-primary btn-block">
            Sign up
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
