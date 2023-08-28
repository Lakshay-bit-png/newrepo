import React, { useEffect, useState, useRef } from "react";

import Common from "../common";
import MyProfile from "../myprof";
import Postlist from "../Postlist";
import { getSpecificUser } from "../../../api/userRequest";

function Anotherprofile({ userData, isMyProfile, isMentor }) {
  // Function to handle input changes
  const userId = window.location.pathname.split("/")[2];
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await getSpecificUser(userId);
        console.log(data.result, "user");
        setUser(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <>
      <Common />
      {user && (
        <div className="main-content-landing">
          {userData && (
            <MyProfile
              isMentor={user.isMentor}
              isMyProfile={false}
              userData={user}
              myUser={userData}
            />
          )}
          {userData && (
            <Postlist
              displaycreatepost={false}
              userData={userData}
              user={user}
            />
          )}
        </div>
      )}
    </>
  );
}
export default Anotherprofile;
