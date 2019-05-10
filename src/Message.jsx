import React, { Component } from "react";

// adds color ot username

const Message = ({ message }) => {
  let userNameColor = {
    color: message.color
  }
  return message.type === "incomingNotification" ? (
      <div className="notification">
        
  <span className="notification-content"> {message.olduser} has changed username to {message.username}</span>
</div>
  ) : (
    <div className="message">
      <span className="message-username" style={userNameColor}>{message.username}</span>
      <span className="message-content">{message.content}</span>
    </div>
  );
};

export default Message;
