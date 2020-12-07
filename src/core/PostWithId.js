import React, { Component } from "react";
import Navbar from "./Navbar";
import firebase from "firebase";
require("firebase/auth");

function CreateComment(props) {
  async function handleSubmit() {
    var CommentListRef = firebase
      .database()
      .ref("Comment/" + props.postKey + "/");
    CommentListRef.push({
      content: document.getElementById("commentMesssageInput").value,
      timeStamp: Math.floor(Date.now() / 1000),
      uid: props.user.userID,
      uimg: props.user.userPhotoURL,
      uname: props.user.displayName,
    });
    document.getElementById("commentMesssageInput").value = "";
  }

  return (
    <div className="comment addNewComment">
      <div className="col-lg-3">
        <tr>
        <div className="userDetailsInComment enterNewComment">
          <img
            className="userImageInComment"
            src={props.user.userPhotoURL}
            alt="user"
          />
          <h1 className="userNameInComment display-5">
            {props.user.displayName}
          </h1>
        </div>
        </tr>
      </div>

      <div className="userCommentArea">
        <textarea
          className="display-4 userCommentInput"
          id="commentMesssageInput"
        ></textarea>
      </div>

      <button className="btn btn-primary btn-block mt-1" onClick={handleSubmit}>
        POST
      </button>
    </div>
  );
}

function RenderComments(props) {
  const comments = props.comments.map((comment) => {
    return (
      <div className="comment" key={comment.timeStamp}>
        <tr>
          <div className="userDetailsInComment">
            <img className="userImageInComment" src={comment.uimg} alt="user" />
            {/* <span> */}
              <h3 className="userNameInComment display-5">{comment.uname}</h3>
            {/* </span> */}
            <span className="userCommentArea">
              <h5 className=" userComment display-4">{comment.content}</h5>
            </span>
          </div>
        </tr>
      </div>
    );
  });

  return <React.Fragment>{comments}</React.Fragment>;
}

function SinglePost(props) {
  return (
    <React.Fragment>
      <div className="post m-3">
        <div className="userArea">
          <img
            alt="user"
            className="userProfileIMG"
            src={props.post.userImage}
            height="50px"
          />
          <h4>{props.post.title}</h4>

          
        </div>
        <img alt="post" className="postImage" src={props.post.pictures} />
        <p>{props.post.description}</p>
      </div>
    </React.Fragment>
  );
}

class PostWithId extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postId: this.props.id,
      post: "",
      comments: [],
      user: {},
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loadPost();
        this.loadComments();
        this.setState({
          user: {
            displayName: user.displayName,
            userPhotoURL: user.photoURL,
            userID: user.uid,
          },
        });
      } else {
        console.log("error");
      }
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: {
            displayName: user.displayName,
            userPhotoURL: user.photoURL,
            userID: user.uid,
          },
        });
      } else {
        console.log("error");
      }
    });
  }

  loadPost = () => {
    const feedRef = firebase.database().ref(`Posts/${this.state.postId}`);
    feedRef.once("value", (snapshot) => {
      const currentpost = snapshot.val();
      this.setState({
        post: currentpost,
      });
    });
  };

  loadComments = () => {
    const commRef = firebase.database().ref(`Comment/${this.state.postId}`);
    let totalcomments = [];
    commRef.on("value", (snapshot) => {
      snapshot.forEach((data) => {
        const currentComment = data.val();
        totalcomments.push(currentComment);
      });
      this.setState({
        comments: totalcomments,
      });
    });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container mt-5 text-center"></div>
        <div className="container text-center singlePostWithId">
          <SinglePost post={this.state.post} />
          <div className="post m-3 renderComment">
            <RenderComments comments={this.state.comments} />
            <CreateComment user={this.state.user} postKey={this.state.postId} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PostWithId;
