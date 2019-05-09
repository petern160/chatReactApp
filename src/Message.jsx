import React, { Component } from "react";


const Message = ({ message }) => {
  return message.type === "incomingNotification" ? (
      <div className="notification">
        
  <span className="notification-content"> {message.olduser} has changed username to {message.username}</span>
</div>
  ) : (
    <div className="message">
      <span className="message-username">{message.username}</span>
      <span className="message-content">{message.content}</span>
    </div>
  );
};

export default Message;
