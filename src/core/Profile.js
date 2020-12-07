import React from "react";
import Navbar from "./Navbar";
import firebase from "firebase";
require("firebase/auth");

function Profile() {
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");
  var newPhotoURL = "";

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setDisplayName(user.displayName);
      setEmail(user.email);
      setPhotoURL(user.photoURL);
    } else {
      console.log("error");
    }
  });

  function updatePhoto(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        user.updateProfile({
          photoURL: newPhotoURL
        })
        .then(() => {
          setPhotoURL(user.photoURL);
          alert("Profile Photo Updated Successfully");
        })        
      } 
    });
  }
  function handlePhotoChange(){
    var target = document.getElementById('userProfileImageInput');
    var file = target.files[0];
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef
      .child("users_photos/" + file.name + Math.floor(Date.now() / 1000))
      .put(file);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {
        var progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      function (error) {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      function () {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          newPhotoURL = downloadURL;
          console.log("File available at", downloadURL);
          updatePhoto();
        });
      }
    );
  }

  if (window.localStorage.getItem("userEmail")) {
    return (
      <div>
        <Navbar />
        <div className="container text-center mt-4">
          <div className="cs7userupdate">
            <img className="cs7userImage" height="200px" src={photoURL} onClick={() => {
              document.getElementById('userProfileImageInput').click();
            }}/>

            <input type="file" id="userProfileImageInput" name="profilePhoto" accept=".png,.jpg,.jpeg" onChange={handlePhotoChange}/>
          </div>
          <div className="container mt-5 display-4">Hello, {displayName}</div>
          <div className="form-label-group">
            <input className="userEmailProfile text-center mt-4 form-control" type="text" value={email} readOnly={true} />
          </div>
        </div>
      </div>
    );
  } else {
    window.location = "/signin";
  }
}

export default Profile;
