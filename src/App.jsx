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
      currentUser: { name: "Anonymous" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      clientNumber: 0
    };
    this.updateUsername = this.updateUsername.bind(this)
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
      this.addToPage(message)

      this.setState ({count: evt})

    }
  }

  updateUsername ({username}){
      console.log('will udate to this username!', username);
      this.setState ({currentUser: { name: username}})
  }

  addToPage(message){
    const oldMessage = this.state.messages;
    const newMessage = [...oldMessage, message];
    this.setState({ messages: newMessage });
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
