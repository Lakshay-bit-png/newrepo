import React from "react";
import Common from "../common";

import Postlist from "../Postlist";


export const DisplayPosts = () => {
  return (
      <>
          <Common />
          <div style={{display:'flex',justifyContent:'center',position:'relative',top:'50px'}}>
              <Postlist />
          </div>
          
      </>
  )
}

