import React, { useEffect } from "react";
import "./index.css";
import google from "../images/google.png";
import linkedin from "../images/linkedin.png";
import logo from "../images/logo.png";
import Header1 from "../../components/Header/index";
import coolimg from "./../images/efdwffw.png";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { set } from "mongoose";
import axios from "axios";
import { loginUser, registerUser } from "../../api/userRequest";
import Pageloader from "../Pagesbar";
import { linkedInAuth} from "../../api/userRequest";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Toast from "../toast";

function Page1({setProgress}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const redirectToPage2 = (event) => {
    console.log(event+"done");
    setProgress(40)
    navigate("/continue");
    setProgress(100)
  };

  // useEffect(() => {
  //     const User = async () => {
  //         try {
  //             // const { data } = await userChats(user._id);
  //             const { data } = await registerUser({
  //                 email: email,
  //                 password: password,
  //                 firstname: firstname,
  //                 lastname: lastname,
  //             });

  //             console.log(data.result);
  //         } catch (error) {
  //             console.log(error);
  //         }
  //     };
  //     User();
  // }, []);
  const onSubmiting = async () => {
    
    if (!isLogin)
      try {
        // const { data } = await userChats(user._id);
        const { data } = await registerUser({
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname,
        });

        console.log(data.token);
        // Storing token in local storage
        localStorage.setItem("skilloptoken", data.token);

        data.result ? navigate("/continue") : alert(data.message);
      } catch (error) {
        console.log(error);
      }
    else{
      try {
        const { data } = await loginUser({
          email: email,
          password: password,
        });
        console.log(data);
        // store token in local storage
        localStorage.setItem("skilloptoken", data.token);

        data.result ? navigate("/homepage") : alert(data.message);
      } catch (error) {
        console.log(error);
      }}
  };

  var x = 0;
  console.log(isLogin);
  const openloginpage = () => {
    if (x == 0) {
      document.querySelector(".name").classList.add("hidethis");
      document.querySelector(".Content-Head").innerHTML = "Welcome Back!";
      document.querySelector(".getstart button").innerHTML = "Login";

      document.querySelector(".already-reg").innerHTML =
        "Don't have an Account ?";
      document.querySelector(".functionhandler").innerHTML = "Sign-Up";
      x = 1;
      setIsLogin(true);
    } else {
      document.querySelector(".name").classList.remove("hidethis");
      document.querySelector(".Content-Head").innerHTML = "Create Your Page";
      document.querySelector(".getstart button").innerHTML = "Get Started";

      document.querySelector(".already-reg").innerHTML =
        "Already Have an Account ?";
      document.querySelector(".functionhandler").innerHTML = "Login";
      x--;
      setIsLogin(false);
    }
  };
  const handleGoogleLoginSuccess = (credentialResponse) => {
    const idToken = credentialResponse.credential;
    const decodedToken = jwt_decode(idToken);

    console.log(decodedToken);

    // Extract user information from decoded token
    const userFirstName = decodedToken.given_name || "";
    const userEmail = decodedToken.email || "";
    const userLastName = decodedToken.family_name || "";

    // Set user information in state
    setFirstname(userFirstName);
    setLastname(userLastName);
    setEmail(userEmail);
  };

  const handleLinkedInAuth = async () => {
    try {
      // Redirect the user to the LinkedIn authorization URL
      window.location.href =
        "https://www.linkedin.com/oauth/v2/authorization?client_id=77mu0lwjmjs088&redirect_uri=https://skillop-frontend-murex.vercel.app&response_type=code&scope=profile";
    } catch (error) {
      console.error("Error during LinkedIn authentication:", error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const data = await linkedInAuth(accessToken);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    // Check if there's an authorization code in the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // console.log("Authorization code:", code);

      setAccessToken(code);
      fetchUserInfo();
    }
  }, []);
  return (
    <>
   
      <div>
        <Header1 />
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: "100px",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <img src={coolimg} className="display-on-pc" />

          <div className="partition-on-pc"></div>
          <div className="main-form">
            <div className="Content-Head">Create Your Page</div>

            <div className="btns">
              <button className="linkedin-btn" onClick={handleLinkedInAuth}>
                <img src={linkedin} alt="LinkedIn Icon" />
                <div className="linkedin">Use LinkedIn</div>
              </button>
              <button className="google-btn">
                {/* <img src={google} alt="Google Icon" />
                <div className="google">Use Google</div> */}
                <GoogleOAuthProvider clientId="1017658767162-8qa8563dtl6h8d6q5n7or5506f6hhqf9.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </GoogleOAuthProvider>
              </button>
            </div>
            <div className="partition">
              <div className="p1"></div>
              <div className="or">Or</div>
              <div className="p2"></div>
            </div>
            <form onSubmit={redirectToPage2} id="myform">
              <div className="name">
                <div className="firstname">
                  <label htmlFor="fname">First Name</label>
                  <input
                    type="text"
                    id="fname"
                    onChange={(e) => setFirstname(e.target.value)}
                    value={firstname}
                  />
                </div>
                <div className="lastname">
                  <label htmlFor="lname">Last Name</label>
                  <input
                    type="text"
                    id="lname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
              </div>
              <div className="id">
                <div className="email">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="pass">
  <label htmlFor="pass">Password</label>
  <div className="password-input-container">
    <input
      type={showPassword ? "text" : "password"}
      id="pass"
      required
      onChange={(e) => setPassword(e.target.value)}
    />
    <button
    type="button"
      className="password-toggle-btn"
      onClick={toggleShowPassword}
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? "Hide" : "Show"}
    </button>
  </div>
</div>

                {/* <div className="pass">
                  <label htmlFor="pass">Password</label>
                  <input
                    type="password"
                    id="pass"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div> */}
              </div>
              <div className="getstart">
              <button type="submit" htmlFor="myform" onClick={onSubmiting}>
                Get Started
              </button>
            </div>
            </form>
            
            <div className="changepage">
              <span className="already-reg">Already Registered ? </span>
              &nbsp;
              <span onClick={openloginpage} className="functionhandler">
                Login
              </span>
            </div>
          </div>
          <div className="partition-on-mob"></div>
          <img src={coolimg} className="display-only-on-mobile" />
        </div>
      </div>
    </>
  );
}

export default Page1;
