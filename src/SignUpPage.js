import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Header, Grid, Cell} from 'react-mdl';
import {Link} from 'react-router';

class SignUpForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { //track values and overall validity of each field
      email:{value:'',valid:false},
      name:{value:'',valid:false},
      password:{value:'',valid:false},
      passwordConf:{value:'',valid:false}
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
    var buttonEnabled = (this.state.email.valid && this.state.name.valid && this.state.password.valid && this.state.passwordConf.valid);
    return (
      <div>
        <form name="signupForm" onSubmit={(e) => this.handleSubmit(e)}>

          <EmailInput value={this.state.email.value} updateParent={this.updateState} />

          <RequiredInput
            id="name" field="name" type="text"
            label="Name" placeholder="your name"
            errorMessage="we need to know your name"
            value={this.state.name.value}
            updateParent={this.updateState} />

          <RequiredInput
            id="password" field="password" type="password"
            label="Password" placeholder=""
            errorMessage="your password can't be blank"
            value={this.state.password.value}
            updateParent={this.updateState} />

          <PasswordConfirmationInput value={this.state.passwordConf.value} password={this.state.password.value} updateParent={this.updateState}/>
          <div>
            <Button raised colored id="submitButton" type="submit" disabled={!buttonEnabled} onClick={this.handleSubmit}>Sign Me Up!</Button>
          </div>
            <span>Aready have an account with us?</span>{' '} <Link to="/login">Sign In</Link>
          <div>
          </div>           
        </form>
      </div>
    );
  }
}


/**
 * A component representing a controlled input for an email address
 */
class EmailInput extends React.Component {
  validate(currentValue){
    if(currentValue === ''){ //check presence
      return {missing: true, isValid: false}
    }

    //check email validity
    //pattern comparison from w3c https://www.w3.org/TR/html-markup/input.email.html#input.email.attrs.value.single
    var valid = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(currentValue)
    if(!valid){
      return {invalidEmail:true, isValid:false};
    }

    return {isValid: true}; //no errors
  }

  handleChange(event){
    //check validity (to inform parent)
    var isValid = this.validate(event.target.value).isValid;

    //what to assign to parent's state
    var stateUpdate = {
      'email': {
        value:event.target.value,
        valid:isValid
      }
    };

    this.props.updateParent(stateUpdate) //update parent state
  }

  render() {
    var errors = this.validate(this.props.value); //need to validate again, but at least isolated
    var inputStyle = 'form-group';
    if(!errors.isValid) inputStyle += ' invalid'; //add styling rule

    return (
      <div className={inputStyle}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" className="form-control" placeholder="email address"
                value={this.props.value}
                onChange={(e) => this.handleChange(e)}
        />
        {errors.missing &&
          <p className="help-block error-missing">we need to know your email address</p>
        }
        {!errors.missing && !errors.isValid &&
          <p className="help-block error-invalid">this is not a valid email address</p>
        }
      </div>
    );
  }
}


/**
 * A component representing a controlled input for a generic required field
 */
class RequiredInput extends React.Component {
  validate(currentValue){
    if(currentValue === ''){ //check presence
      return {required: true, isValid: false};
    }
    return {isValid: true}; //no errors
  }

  handleChange(event){
    //check validity (to inform parent)
    var isValid = this.validate(event.target.value).isValid;

    //what to assign to parent's state
    var stateUpdate = {}
    stateUpdate[this.props.field] = {
      value:event.target.value,
      valid:isValid
    }

    this.props.updateParent(stateUpdate) //update parent state
  }

  render() {
    var errors = this.validate(this.props.value); //need to validate again, but at least isolated
    var inputStyle = 'form-group';
    if(!errors.isValid) inputStyle += ' invalid';

    return (
      <div className={inputStyle}>
        <label htmlFor={this.props.field}>{this.props.label}</label>
        <input type={this.props.type} id={this.props.id} name={this.props.field}className="form-control" placeholder={this.props.placeholder}
                value={this.props.value}
                onChange={(e) => this.handleChange(e)}
        />
        {!errors.isValid &&
          <p className="help-block error-missing">{this.props.errorMessage}</p>
        }
      </div>
    );
  }
}


/**
 * A component representing a controlled input for a password confirmation
 */
class PasswordConfirmationInput extends React.Component {
  validate(currentValue){
    if (this.props.password === '') {
      return {isValid:true};
    }

    if (currentValue === this.props.password) {
      return {isValid:true};
    } else {
      return {mismatched:true, isValid:false}
    }
  }

  handleChange(event){
    //check validity (to inform parent)
    var isValid = this.validate(event.target.value).isValid;

    //what to assign to parent's state
    var stateUpdate = {
      // the state name is called passwordConf!!!
      'passwordConf': {
        value:event.target.value,
        valid:isValid
      }
    };

    this.props.updateParent(stateUpdate) //update parent state
  }

  render() {
    var errors = this.validate(this.props.value); //need to validate again, but at least isolated
    var inputStyle = 'form-group';
    if(!errors.isValid) inputStyle += ' invalid';

    return (
      <div className={inputStyle}>
        <label htmlFor="passwordConf">Confirm Password</label>
        <input type="password" id="passwordConf" name="passwordConf" className="form-control"
                value={this.props.value}
                onChange={(e) => this.handleChange(e)}
        />
        {errors.mismatched &&
          <p className="help-block error-mismatched">passwords don't match</p>
        }
      </div>
    );
  }
}

class SignUpPage extends React.Component {
    render() {
        return (
            <div>
                <Header title="Sign Up" />
                <Grid>
                    <Cell offset={1} col={10}><SignUpForm /></Cell>
                </Grid>
            </div>
        );
    }
}

export default SignUpPage;
export {EmailInput, RequiredInput}