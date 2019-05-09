import React, {Component} from 'react';


class Navbar extends Component {
  render() {
    // displays users or user depends on if client number > 1
    let userCount = this.props.clientNumber > 1 ? ' users online' : ' user online'
    return (
      <div> 
         <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty </a><span className="userCount">{this.props.clientNumber}{userCount}</span>
          </nav>
      </div>
     
    );
  }
}
export default Navbar;

