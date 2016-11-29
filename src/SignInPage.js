import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Header, Grid, Cell} from 'react-mdl';
import {Link} from 'react-router';
import {EmailInput, RequiredInput} from './SignUpPage.js';

class SignInForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { //track values and overall validity of each field
      email:{value:'',valid:false},
      password:{value:'',valid:false},
    };

    this.updateState = this.updateState.bind(this); //bind for scope
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //callback for updating the state with child information
  updateState(stateChange){
    this.setState(stateChange);
  }

  //callback for the submit button
  handleSubmit(event) {
    event.preventDefault();
    console.log("submit!");
  }

  render() {
    //if all fields are valid, button should be enabled
    var buttonEnabled = (this.state.email.valid && this.state.password.valid);
    return (
      <div>
        <form name="signInForm" onSubmit={(e) => this.handleSubmit(e)}>

          <EmailInput value={this.state.email.value} updateParent={this.updateState} />

          <RequiredInput
            id="password" field="password" type="password"
            label="Password" placeholder=""
            errorMessage="your password can't be blank"
            value={this.state.password.value}
            updateParent={this.updateState} />

          <div>
            <Button raised colored id="submitButton" type="submit" disabled={!buttonEnabled} onClick={this.handleSubmit}>Sign In</Button>
          </div>
            <span>Don't have an accout yet?</span>{' '} <Link to="/join">Sign Up</Link>
          <div>
          </div>           
        </form>
      </div>
    );
  }
}


class SignInPage extends React.Component {
    render() {
        return (
            <div>
                <Header title="Sign Up" />
                <Grid>
                    <Cell offset={1} col={10}><SignInForm /></Cell>
                </Grid>
            </div>
        );
    }
}

export default SignInPage;