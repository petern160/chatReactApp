import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import Chatbar from './Chatbar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

const URL = 'ws://localhost:3001'

const ws = new WebSocket(URL)
class App extends Component {
  
  
  constructor(props) {
  super(props);
  this.state = {
    currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: [
      {
        username: "Bob",
        content: "Has anyone seen my marbles?",
      },
      {
        username: "Anonymous",
        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
      }
    ]
  }
  this.addMessage = this.addMessage.bind(this)
  }
  
  componentDidMount() {
    ws.onopen = () => {
      console.log('connected')
    }

   

    
    
  }
  
  
    addMessage(message) {
    ws.send(JSON.stringify(message))
  }
  
  render() {
    return (
      <div>
        
         
         <Navbar />
         <MessageList messages = {this.state.messages}/>
         
         <Chatbar currentUser={this.state.currentUser} addMessage={this.addMessage}/>
      </div>
     
    );
  }
}
export default App;

