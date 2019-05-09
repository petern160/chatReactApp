import React, { Component } from "react";
import App from "./App.jsx";

class Chatbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { currentUser: { name }} = this.props;
    let userName =
    name && name.length !== ""
      ? name
      : 'Anonymous';

    const keyPressEnter = event => {
      if (event.key === "Enter") {
        const obj = {
          type: "PostMessage",
          username: userName,
          content: event.target.value
        };
        event.target.value = "";

        this.props.addMessage(obj);
      }
    };

    const enterKeyUser = event => {
      if(event.key ==="Enter"){
        // send obj to server
      const obj = {
        type: 'UserNameChange',
        content: `${this.props.currentUser.name} has changed name to ${event.target.value}`,
        olduser: this.props.currentUser.name,
        username: event.target.value
      }
       this.props.updateUsername(obj)
       event.target.value = ""
       this.props.addMessage(obj)
      }
    }
    

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
