import React from "react";
import Navbar from "./Navbar";
// import Footer from "./Footer";
import firebase from "firebase";
import Post from "./Post";
require("firebase/auth");

function Feed() {
    const [displayName,setDisplayName] = React.useState("");
    let posts=[];
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          setDisplayName(user.displayName);
        } else {
          console.log("error");
        }
      });
      const feedRef = firebase.database().ref('Posts');
      feedRef.on('value', (snapshot) => {
        let data = snapshot.val();
        for (let post in data) {
          posts.push({
            key: post,
            description: data[post].description,
            title: data[post].title,
            pictures: data[post].pictures,
            userImage : data[post].userImage,
          });
        }
      });

      if(window.localStorage.getItem("userEmail")) {
        return (
            <div>
                <Navbar />
        <div className="container mt-5 text-center">Welcome Back, {displayName}</div>
        <hr />
        <div className="container text-center">
        {posts.map((post) => (
            <Post
            key={post.key}
            userImage={post.userImage}
            title={post.title}
            description={post.description}
            pictures={post.pictures}
            userName={post.author}
            />
          ))}
    </div>
                {/* <Footer /> */}
            </div>
        );  
    } else {
        window.location="/signin"
    }
}

export default Feed;