import React, { Component } from "react";
import App from "./App.jsx";

const letters = `0123456789ABCDEF`;
let userColor = `#`;
for (let i = 0; i < 6; i++) {
  userColor += letters[Math.floor(Math.random() * 16)];
}

class Chatbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // if username is blank becomes Anonymous
    let {
      currentUser: { name }
    } = this.props;
    let userName = name && name.length !== "" ? name : "Anonymous";

    // on enter sends data to server
    const keyPressEnter = event => {
      if (event.key === "Enter") {
        const obj = {
          type: "PostMessage",
          username: userName,
          content: event.target.value,
          color: userColor
        };
        event.target.value = "";

        this.props.addMessage(obj);
      }
    };

    // on enter updates username and sends username to server
    const enterKeyUser = event => {
      if (event.key === "Enter") {
        // send obj to server
        const obj = {
          type: "UserNameChange",
          content: `${this.props.currentUser.name} has changed name to ${
            event.target.value
          }`,
          olduser: this.props.currentUser.name,
          username: event.target.value
        };
        this.props.updateUsername(obj);
        event.target.value = "";
        this.props.addMessage(obj);
      }
    };

    return (
      <div>
        <footer className="chatbar">
          <input
            className="chatbar-username"
            placeholder="Your Name"
            onKeyPress={enterKeyUser}
            defaultValue={this.props.currentUser.name}
          />
          <input
            className="chatbar-message"
            placeholder="Type a message and hit ENTER"
            onKeyPress={keyPressEnter}
          />
        </footer>
      </div>
    );
  }
}
export default Chatbar;
