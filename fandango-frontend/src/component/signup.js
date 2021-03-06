import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signupAction } from '../actions/actions';

import '../css/foundation.css';
import '../css/nav.css';
import '../css/vipregistration.css';
import { Link } from 'react-router-dom';
import Redirect from 'react-router-dom/Redirect';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
          fname       : '',
          lname       : '',
          email       : '',
          passwordOne : '',
          passwordTwo : '',
        }

    }

    handleChange = (events) => {
      if(events.target.name === "Fname"){
          this.setState({
              fname : events.target.value
          });
      }
      if(events.target.name === "Lname"){
        this.setState({
            lname : events.target.value
        });
      }
      if(events.target.name === "Email"){
          this.setState({
              email : events.target.value
          });
      }

      if(events.target.name === 'inputPasswordOne'){
          this.setState({
              passwordOne: events.target.value
          });
      }

      if(events.target.name === 'inputPasswordTwo'){
        this.setState({
            passwordTwo: events.target.value
        });
      }
    }

    handleSubmit = (events) =>{
        if(this.state.passwordOne !== this.state.passwordTwo){
          alert("Passwords do not match");
        }
        // events.preventDefault();
        const newData = {
            fName : this.state.fname,
            lName : this.state.lname,
            email : this.state.email,
            password : this.state.passwordOne,
            passwordTwo : this.state.passwordTwo
        }
        console.log("New Data : ", newData);
        this.props.signupAction(newData);
    }

    render() {
      let errorMsg=null;
      if(this.props.error){
        console.log("Error Msg Value : "+this.props.error);
        errorMsg = (
            <div className="myErrorMsg">
                Email already in use.
            </div>
        );
      }
        let redirectVar = null;
        if(this.props.id){
          redirectVar = <Redirect to="signin"/>
        }
        return (
          <div>
            {redirectVar}
            <div style = {{backgroundColor : "black"}}>
              <header id="registration-header" className="registration-header" role="banner">
                <nav role="navigation" className="nav-bar">
                  <div className="row">
                    <div className="large-11 large-centered columns">
                      <ul className="inline-items">
                        <li className="site-logo">
                            <img src="https://images.fandango.com/r1.0.431/redesign/static/img/fandango-logo.svg" alt="Fandango Logo" className="brand-img"/>
                        </li>
                      </ul>
                      <div className="registration-mode right">
                        <span>Already have a Fandango VIP Account?</span> &nbsp;<Link to = "/signin" class="cta">Sign In</Link>
                      </div>
                    </div>
                  </div>
                </nav>
              </header>
            </div>  
            <div className="container">

              <form className="form-signin" >

                <h2 className="form-signin-heading">Sign Up</h2><br/>

                <input type="text" onChange = {this.handleChange} id="Fname" name = "Fname" className="form-control" placeholder="First Name" required autoFocus/>

                <input type="text" onChange = {this.handleChange} id="Lname" name = "Lname" className="form-control" placeholder="Last Name" required />

                <p className="errMsg">{errorMsg}</p>

                <input type="email" onChange = {this.handleChange} id="Email" name = "Email" className="form-control" placeholder="Email" required/><br/>

                <input type="password" onChange = {this.handleChange} id="inputPasswordOne" name = "inputPasswordOne" className="form-control" placeholder="Password" required /><br/>

                <input type="password" onChange = {this.handleChange} id="inputPasswordTwo" name = "inputPasswordTwo" className="form-control" placeholder="Confirm Password" required /> <br/>             
                
                <Link to="/signin" onClick = {this.handleSubmit.bind(this)} className="btn btn-primary form-control">Sign Up</Link>

                

              </form>
            </div>
        </div>    
    )}
  }
  
const mapStateToProps = state => {
  return {
      id : state.id,
      fname       : state.fname,
      passwordOne : state.passwordOne,
      passwordTwo :state.passwordTwo,
      error : state.error
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signupAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);