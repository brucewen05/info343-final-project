import React, { Component } from 'react';
import {Link} from 'react-router';
import {Layout, Drawer, Navigation, Content, Icon} from 'react-mdl';
import './App.css';
import firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleSignOut = this.handleSignOut.bind(this);
  }

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
                {/*need to look at how to deal with this later! */}
                <a onClick={this.handleSignOut} className="sign-out-button"><Icon name="input" />{' '}Sign out</a>
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
