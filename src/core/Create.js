import React from "react";
import Navbar from "./Navbar";
// import Footer from "./Footer";
import firebase from "firebase";

function Create() {
  const [displayName, setDisplayName] = React.useState("");
  const [userPhotoURL, setUserPhotoURL] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [userID, setUserID] = React.useState("");
  const [isImageUploaded, setIsImageUploaded] = React.useState(false);

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setDisplayName(user.displayName);
      setUserPhotoURL(user.photoURL);
      setUserID(user.uid);
    } else {
      console.log("error");
    }
  });

  function handleChange(event) {
    const target = event.target;
    const name = target.name;
    if (name === "inputTitle") {
      setTitle(target.value);
    } else if (name === "inputDescription") {
      setDescription(target.value);
    } else if (name === "inputFile") {
      var file = target.files[0];
      var storageRef = firebase.storage().ref();
      var uploadTask = storageRef
        .child("blog_images/" + file.name + Math.floor(Date.now() / 1000))
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
              window.document
                .getElementById("submitbtn")
                .classList.add("disabled");
              window.document.getElementById("submitbtn").disabled = true;
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              window.document
                .getElementById("loadingGIF")
                .classList.remove("d-none");
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
          setIsImageUploaded(true);
          window.document.getElementById("submitbtn").classList.remove("disabled");
          window.document.getElementById("loadingGIF").classList.add("d-none");
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log("File available at", downloadURL);
            setImageUrl(downloadURL);
          });
        }
      );
    }
  }

  function handleSubmit() {
    if(title&&description&&isImageUploaded){
      var postListRef = firebase.database().ref("Posts");
      var newPostRef = postListRef.push();
  
      newPostRef.set({
        author: displayName,
        userImage: userPhotoURL,
        title: title,
        description: description,
        pictures: imageUrl,
        userId: userID,
        timeStamp: Math.floor(Date.now() / 1000),
        postKey: newPostRef.key,
      });
      alert("Upload Successful");
      window.location("/feed");
      setTitle("");
      setDescription("");
      setImageUrl("");
    } else{
      alert("Fill all fields first!");
    }
    
  }

  if (window.localStorage.getItem("userEmail")) {
    return (
      <div>
        <Navbar />
        <div className="container mt-5">
          <div className="form">
            <form className="form-signin">
              <div className="form-label-group">
                <input
                  type="text"
                  name="inputTitle"
                  id="inputTitle"
                  className="form-control"
                  placeholder="Title"
                  value={title}
                  onChange={handleChange}
                  required={true}
                />
                <label htmlFor="inputEmail">Title</label>
              </div>
              <div className="form-label-group">
                <textarea
                  id="inputDescription"
                  className="form-control"
                  name="inputDescription"
                  required={true}
                  placeholder="Description"
                  value={description}
                  onChange={handleChange}
                />
                <label htmlFor="message">Description</label>
              </div>
              <div className="form-label-group mb-5">
                <input
                  type="file"
                  id="docpicker"
                  id="inputFile"
                  name="inputFile"
                  accept=".png,.jpg,.jpeg"
                  required={true}
                  onChange={handleChange}
                />
                <label htmlFor="message">Upload File</label>
                <br />
                <img
                  className="d-none"
                  id="loadingGIF"
                  src="https://media1.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif?cid=ecf05e47tjct35l92x0bg68r4e8bc3tsf8n50r9jrhzepfhy&rid=giphy.gif"
                  height="100"
                />
              </div>
              <button
                className="btn btn-lg btn-primary btn-block disabled"
                id="submitbtn"
                onClick={handleSubmit}
              >
                Create
              </button>
            </form>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  } else {
    window.location = "/signin";
  }
}
export default Create;
