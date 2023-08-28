import React from "react";
import Common from "../common";
import MyProfile from "../myprof";
import user from "../../images/user.png";
import meet from "../../images/meet.jpeg";
import { useState, useEffect } from "react";
import { getSpecificPost, likeOrDislikePost } from "../../../api/postRequest";
import { useNavigate } from "react-router-dom";

function Otherpost({ userData }) {
  const postId = window.location.pathname.split("/")[2];
  const [post, setPost] = useState(null);

  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const goToProfile = () => {
    navigate(`/profile/${post.author._id}`);
  };
  const likethispost = async (event) => {
    setLiked(!liked);
    try {
      const { data } = await likeOrDislikePost(postId);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    // if (event.target.style.color != "rgb(16, 39, 111)") {
    //     event.target.style.color = "rgb(16, 39, 111)";
    // } else {
    //     event.target.style.color = "gray";
    //     document.querySelector(".like-count").value -= 1;
    // }
  };

  // define useState to get the post with this postId from backend
  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await getSpecificPost(postId);
        console.log(data.result);
        setPost(data.result);
        setLiked(data.result.likes.includes(userData._id));
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [postId, liked, userData._id]);
  console.log(post);
  return (
    <>
      <Common />
      <div className="main-content-landing">
        {post && <MyProfile userData={post.author} myUser={userData} />}
        {post && (
          <div className="posting-on-landing">
            <div className="people-post">
              <div className="post-1">
                <div className="post-postedby" onClick={goToProfile}>
                  <img src={post.author.profilePicUrl} alt={post.title} />
                  <div>
                    <span
                      style={{ fontWeight: "bold" }}
                      className="posted-by-name"
                    >
                      {post.author.firstname} {post.author.lastname}
                    </span>
                    <span
                      style={{ fontSize: "12px" }}
                      className="posted-by-brief"
                    >
                      {post.author.isMentor ? "Mentor" : "Mentee"}
                    </span>
                  </div>
                </div>
                <img
                  src={post.imageUrls[0]}
                  className="img-posted"
                  alt={post.title}
                />

                <div className="reactions">
                  <i
                    style={{
                      fontSize: "25px",
                      color: liked ? "rgb(16, 39, 111)" : "gray",
                      cursor: "pointer",
                    }}
                    className="fa fa-thumbs-up"
                    onClick={likethispost}
                  ></i>
                  <div className="like-count">{post.likes.length} likes</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Otherpost;
