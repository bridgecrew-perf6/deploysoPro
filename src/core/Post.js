// import React from "react";
// import { Link } from "react-router-dom";

// function Post(props) {
//   return (
//     <div className="post m-3">
//       <div className="userArea">
//         <img
//           className="userProfileIMG"
//           src={props.post.userimage}
//           height="50px"
//         />
//       <h4>{props.post.title}</h4>
//       </div>
//       <img className="postImage" src={props.post.pictures} />
//       <p>{props.post.description}</p>
//       <Link to={`/feed/${props.post.key}`}>
//         <h3>Read More</h3>
//       </Link>
//     </div>
//   );
// }

// export default Post;

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
        <div className="post-detail">
          <h4>{props.post.title}</h4>
          <p>{props.post.description}</p>
        </div>
      </div>
      <div className="cs7buttonerror">
        <img className="postImage" src={props.post.pictures} />
        <Link to={`/feed/${props.post.key}`}>
          <h3 className=" cs7button btn btn-warning">Read More</h3>
        </Link>
      </div>
    </div>
  );
}

export default Post;
