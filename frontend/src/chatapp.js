import React from 'react';

import "./chat.css";

import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function CH() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <> 
<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <div className="App" >
      {!showChat ? (
        <div className="joinChatContainer">
          <h3 >Join A Chat</h3>
          <input
            type="text"
            placeholder="Your Name"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
             
          <input
            type="text"
            placeholder="ID room"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
        
          <button  onClick={joinRoom} >Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div></div></>
  );
}

export default CH;
