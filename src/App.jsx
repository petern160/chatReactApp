import React, { Component } from "react";
import Navbar from "./Navbar.jsx";
import Chatbar from "./Chatbar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
const URL = "ws://localhost:3001";

const ws = new WebSocket(URL);

const letters = `0123456789ABCDEF`;
let userColor = `#`;
for (let i = 0; i < 6; i++) {
  userColor += letters[Math.floor(Math.random() * 16)];
}

class App extends Component {
  constructor(props) {
    super(props);
    // handles state of users, messages, and clients online
    this.state = {
      currentUser: { name: "Anonymous" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      clientNumber: 0,
      color: userColor
    };
    this.updateUsername = this.updateUsername.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    ws.onopen = () => {
      console.log("connected");
    };

    // receives number of users online and and messages from server
    ws.onmessage = evt => {
      const loggedUsers = JSON.parse(evt.data);
      console.log(`this is clients logged info: `, loggedUsers);
      if (loggedUsers.clientNumber) {
        this.setState({ clientNumber: loggedUsers.clientNumber });
        return;
      }
      // adds message to page
      const message = JSON.parse(evt.data);
      console.log(message);
      this.addToPage(message);
    };
  }

  // changes state of username
  updateUsername({ username }) {
    this.setState({ currentUser: { name: username } });
  }

  // renders message on page
  addToPage(message) {
    const oldMessage = this.state.messages;
    const newMessage = [...oldMessage, message];
    this.setState({ messages: newMessage });
  }

  // sends messages to server
  addMessage(message) {
    ws.send(JSON.stringify(message));
  }

  render() {
    return (
      // different components with props passed down
      <div className>
        <Navbar clientNumber={this.state.clientNumber} />
        <MessageList messages={this.state.messages} />

        <Chatbar
          oldUser={this.state.currentUser.name}
          currentUser={this.state.currentUser}
          addMessage={this.addMessage}
          updateUsername={this.updateUsername}
        />
      </div>
    );
  }
}
export default App;
