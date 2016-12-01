import React, { Component } from 'react';
import {Link} from 'react-router';
import './App.css';
import firebase from 'firebase';
import AppBar from 'material-ui/AppBar';
import DrawerMenu from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-back';
import {Layout, Drawer, Navigation, Content, Icon} from 'react-mdl';




import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  handleSignOut() {
    if (firebase.auth().currentUser) {
      console.log("about to sign out");
      firebase.auth().signOut();
    }
  }

  render() {
    return (
     <Layout fixedDrawer={true}>
      <Drawer>
        <Navigation>
          <Link to="/main">Main Page</Link>
          <Link to="/discussions">Discussion board</Link>
          <Link to="/FAQs">FAQs</Link>
          <Link to="/events">Events</Link>
          <a onClick={this.handleSignOut}><Icon name="input" />{' '}Sign out</a>
        </Navigation>
      </Drawer>
      <Content>
        {this.props.children}
      </Content>
    </Layout>
    );
  }
}
export default App;
