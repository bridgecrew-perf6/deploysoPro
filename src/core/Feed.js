import React, { Component } from "react";
import Navbar from "./Navbar";
import firebase from "firebase";
import Post from "./Post";
require("firebase/auth");

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: "",
      posts: [],
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          displayName: user.displayName,
        });
        this.loadPosts();
      } else {
        console.log("error");
      }
    });
  }

  loadPosts = () => {
    const feedRef = firebase.database().ref("Posts");
    let morepost = this.state.posts;

    feedRef.on("value", (snapshot) => {
      snapshot.forEach((data) => {
        const currentPost = data.val();
        let post = {
          key: currentPost.postKey,
          description: currentPost.description,
          title: currentPost.title,
          pictures: currentPost.pictures,
          userimage: currentPost.userImage,
        };
        morepost.push(post);
      });

      this.setState({
        posts: morepost,
      });
    });
  };
  render() {
    if (window.localStorage.getItem("userEmail")) {
      const postWithIds = this.state.posts.map((post) => {
        return (
          <div key={post.key} className="postid">
            <Post post={post} />
          </div>
        );
      });
      return (
        <div>
          <Navbar />
          <div className="container mt-5 text-center">
            Welcome Back, {this.state.displayName}
          </div>
          <hr />
          <div className="container text-center">
            {postWithIds}
          </div>
        </div>
      );
    } else {
      window.location = "/signin";
    }
  }
}

export default Feed;
