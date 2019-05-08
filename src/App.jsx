import React, { Component } from "react";
import Navbar from "./Navbar.jsx";
import Chatbar from "./Chatbar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
const URL = "ws://localhost:3001";

const ws = new WebSocket(URL);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
  }
  
  
  componentDidMount() {
    ws.onopen = () => {
      console.log("connected");
    };


    ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data)
      console.log(message)
    }
  }

  

  addMessage(message) {
    ws.send(JSON.stringify(message));
  }

  render() {
    return (
      <div>
        <Navbar />
        <MessageList messages={this.state.messages} />

        <Chatbar
          currentUser={this.state.currentUser}
          addMessage={this.addMessage}
        />
      </div>
    );
  }
}
export default App;
