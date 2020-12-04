import React from "react";
import Navbar from "./Navbar";
// import Footer from "./Footer";
import firebase from "firebase";
require("firebase/auth");

function Profile() {
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setDisplayName(user.displayName);
      setEmail(user.email);
      setPhotoURL(user.photoURL);
    } else {
      console.log("error");
    }
  });

  if (window.localStorage.getItem("userEmail")) {
    return (
      <div>
        <Navbar />
        <div className="container text-center mt-4">
          <img height="200px" src={photoURL} />
          <div className="container mt-5 display-4">Hello, {displayName}</div>
          <div className="form-label-group">
            <input className="userEmailProfile text-center mt-4 form-control" type="text" value={email} readOnly={true} />
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  } else {
    window.location = "/signin";
  }
}

export default Profile;
