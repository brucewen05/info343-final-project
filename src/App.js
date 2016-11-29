import React, { Component } from 'react';
import {Link} from 'react-router';
import {Layout, Drawer, Navigation, Content, Icon} from 'react-mdl';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.dummy = this.dummy.bind(this);
  }
  dummy() {
    console.log("app dummy!");
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
                <a onClick={this.dummy} className="sign-out-button"><Icon name="input" />{' '}Sign out</a>
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
