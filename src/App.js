import React, { Component } from 'react';
import {Link, hashHistory} from 'react-router';
import './App.css';
import firebase from 'firebase';
import AppBar from 'material-ui/AppBar';
import DrawerMenu from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-back';




import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.sign = null;
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  handleClose() {
    this.setState({open: false});
  }

  handleSignOut() {
    this.setState({open: false});
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
    }
    hashHistory.push("/login");
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        console.log('should be able to log out');
        this.sign = <Link to="/login"><MenuItem onTouchTap={this.handleClose} >Sign In</MenuItem></Link>;

      }
      else{
        console.log('should be able to log in');
      }
    })
  }

  render() {
    return (
     <div>
       <MuiThemeProvider>
        <AppBar
          title="Title"
          iconElementLeft={<IconButton><MenuIcon /></IconButton>}
          onLeftIconButtonTouchTap={this.handleToggle} >
          <DrawerMenu
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => {this.setState({open})} } >
            <Link to="/main"><MenuItem onTouchTap={this.handleClose} >Homepage</MenuItem></Link>
            <Link to="/about"><MenuItem onTouchTap={this.handleClose} >About</MenuItem></Link>
            <Link to="/news"><MenuItem onTouchTap={this.handleClose} >News</MenuItem></Link>
            <Link to="/discussions"><MenuItem onTouchTap={this.handleClose} >Discussions</MenuItem></Link>
            <Link to="/events"><MenuItem onTouchTap={this.handleClose} >Events</MenuItem></Link>
            <SignInOrOut handleClose={this.handleClose} handleSignOut={this.handleSignOut}/>
          </DrawerMenu>
        </AppBar>
      </MuiThemeProvider>
      <div className="container">
        {this.props.children}
      </div>
    </div>
    );
  }
}

class SignInOrOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {link: '', touchTap: null, text: ''}
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        console.log('should be able to log out');
        this.setState({link: '/main', touchTap: this.props.handleSignOut, text: 'Sign Out'})

      }
      else{
        console.log('should be able to log in');
        this.setState({link: '/login', touchTap: this.props.handleClose, text: 'Sign In'})
      }
    })
  }

  render() {
    return (
      <Link to={this.state.link}><MenuItem onTouchTap={this.state.touchTap}><ArrowIcon />{' '}{this.state.text}</MenuItem></Link>
    );
  }
}


export default App;
