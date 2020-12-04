import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import firebase from "firebase";
require("firebase/auth");

function Signout() {
  firebase.auth().signOut().then(function() {
    alert("Sign Out Success")
  }).catch(function(error) {
     alert(error)
  });
  window.localStorage.setItem("userEmail", "");
  return (
    <div>
      <Navbar />
      <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 className="display-4">
          {" "}
          So<span className="text-success">P</span>
          <span className="text-warning">R</span>
          <span className="text-danger">O</span>
        </h1>
      </div>
      <div className="container text-center mt-3">
        <h4>Sign Out Successful!</h4>
        <img
          height="150px"
          alt="Bye GIF"
          src="https://media.tenor.com/images/0f5648857cbfade11f3b0a7089f760a6/tenor.gif"
        />
      </div>
      <Footer />
    </div>
  );
}

export default Signout;
