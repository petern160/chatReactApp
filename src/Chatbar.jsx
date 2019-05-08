import React, { Component } from "react";
import App from "./App.jsx";

class Chatbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let userName =
      this.props.currentUser.name.length !== 0
        ? this.props.currentUser.name
        : "Anonymous";
    const keyPressEnter = event => {
      if (event.key === "Enter") {
        const obj = {
          type: "Message",
          username: userName,
          content: event.target.value
        };
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
            value={this.props.currentUser.name}
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
