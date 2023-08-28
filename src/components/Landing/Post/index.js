import React, { useEffect, useState, useRef } from "react";

import Common from "../common";
import MyProfile from "../myprof";
import Postlist from "../Postlist";

function Post({ userData }) {
  // Function to handle input changes

  return (
    <>
      <Common />
      <div className="main-content-landing">
        {userData && (
          <MyProfile isMyProfile={true} userData={userData} myUser={userData} />
        )}
        {userData && <Postlist displaycreatepost={true} userData={userData} />}
      </div>
    </>
  );
}
export default Post;
