import React from "react";
import { Link } from "react-router-dom";

function Post(props) {
  return (
    <div className="post m-3">
      <div className="userArea">
        <img
          className="userProfileIMG"
          src={props.post.userimage}
          height="50px"
        />
      <h4>{props.post.title}</h4>
      </div>
      <img className="postImage" src={props.post.pictures} />
      <p>{props.post.description}</p>
      <Link to={`/feed/${props.post.key}`}>
        <h3>Read More</h3>
      </Link>
    </div>
  );
}

export default Post;
