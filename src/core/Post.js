import React from "react";

function Post(props) {
  return (
    <div className="post m-3">
      <div className="userArea">
        <img className="userProfileIMG" src={props.userImage} height="50px" />
        <p className="userName">{props.userName}</p>
      </div>
      <hr />
      <h4>{props.title}</h4>
      <img className="postImage" src={props.pictures} />
      <p>{props.description}</p>
    </div>
  );
}

export default Post;
