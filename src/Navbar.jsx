import React, {Component} from 'react';


class Navbar extends Component {
  render() {
    return (
      <div> 
         <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty + {this.props.clientNumber}</a>
          </nav>
      </div>
     
    );
  }
}
export default Navbar;

