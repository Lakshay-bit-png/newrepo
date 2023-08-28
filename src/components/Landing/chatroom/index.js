import React, { useEffect, useState, useRef } from "react";
import user from "../../images/user.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Common from "../common";
import MyProfile from "../myprof";
import { userChats } from "../../../api/chatRequest";
import Conversation from "../../Conversation";
import Chatbox from "../../Chatbox";
import { io } from "socket.io-client";

function Chat({ userData }) {
  // console.log(userData);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);
  const socket = useRef();

  // send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current = io("http://localhost:3000");
    {
      userData && socket.current.emit("new-user-add", userData._id);
    }
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, []);

  // receive message from socket server

  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setRecieveMessage(data);
    });
  }, []);

  useEffect(() => {
    if (userData !== null) {
      const getChats = async () => {
        try {
          const { data } = await userChats(userData._id);

          setChats(data);
          // console.log(data);
        } catch (error) {
          console.log(error);
        }
      };
      getChats();
    }
  }, [userData]);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };
  const handleSendMessage = () => {
    var newMessage;
    if (inputMessage.trim() !== "") {
      newMessage = {
        id: messages.length + 1,
        sender: "user",
        message: inputMessage,
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
    }
    axios
      .put("path/to/updateChat", newMessage)
      .then((response) => {
        console.log("Message added:", response.data);
      })
      .catch((error) => {
        console.error("Error adding message:", error);
      });
  };
  /*-------------------------------------------------------*/
  const navigate = useNavigate();

  const targetRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (targetRef.current && !targetRef.current.contains(event.target)) {
        // This condition checks if the clicked element is not within the target div
        // Place your function code here

        document.querySelector(".filtered-results").classList.add("hidethis");
        document.querySelector(".search-bar-landing").value = "";
        document.querySelector(".search-bar-landing").style.width = "200px";
        document.querySelector(".search-bar-landing").style.borderRadius =
          "20px";
        document.querySelector(".search-bar-landing").style.background =
          "rgb(225,225,225)";
        document.querySelector(".search-bar-landing").style.width = "200px";
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Function to handle input changes
  //const handleInputChange = (event) => {
  //const newValue = event.target.value;
  //setInputValue(newValue);
  //};

  return (
    <>
      <Common />
      <div className="main-content-landing">
        <MyProfile isMyProfile={true} userData={userData} myUser={userData} />
        <div className="chat-room">
          <Chatbox
            chat={currentChat}
            currentUser={userData._id}
            setSendMessage={setSendMessage}
            recieveMessage={recieveMessage}
          />
          <div className="chat-friends-list">
            {userData &&
              chats.map((chat) => (
                <div onClick={() => setCurrentChat(chat)}>
                  <Conversation data={chat} currentUser={userData._id} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Chat;