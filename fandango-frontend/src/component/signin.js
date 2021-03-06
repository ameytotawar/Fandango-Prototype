import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signinAction } from '../actions/actions';
import '../css/signin.css';
import Redirect from 'react-router-dom/Redirect';
import axios from 'axios';
import { Link } from 'react-router-dom';


class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email     : '',
      password  : '',
      count: 0,
      elapsed: 0,
      start:new Date(),
    }
    this.tick=this.tick.bind(this);
    //this.handleSubmitForTime=this.handleSubmitForTime.bind(this);
    this.incrementCount=this.incrementCount.bind(this);
  }

  componentDidMount(){
    this.timer = setInterval(this.tick, 50);
  }


  componentWillUnmount(){
    clearInterval(this.timer);
  }
  
  handleChange = (events) =>{
    if(events.target.name === 'email'){
        this.setState({
            email : events.target.value,
           
        });
    }
    if(events.target.name === 'password'){
        this.setState({
            password : events.target.value,
          
        });
    }
  }
  handleSubmit = (events) =>{
    events.preventDefault();
    var elapsed = Math.round(this.state.elapsed / 100);
    var seconds = (elapsed / 10).toFixed(1);  
    localStorage.setItem('currentPage','home');
    console.log("Inside Time ");
    /*var url = 'http://localhost:8900/log/';
    axios(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    },
    data: JSON.stringify({
        time: seconds,
        page :"signin",
        pageclick : this.state.count,
        hallticketcount:0,
        movierating:0,
        movie : "",
        movieclick : 0,
        fname : "Anuui",
        lname : "jggsd",
        state : "CA",
        city : "New York",
        hall : "",
        hallbooking:0,
        moviebooking:0,
        bookingdate:""

    })
    }).then((res) => {
        console.log("AFter Response : ", res);
        const newData = {
          username : this.state.email,
          password : this.state.password
      }  
      this.props.signinAction(newData);
    });
    */
        const newData = {
          username : this.state.email,
          password : this.state.password
        }
        this.props.signinAction(newData);
  }

  incrementCount = () => {
		this.setState(
            {...this.state, count: this.state.count + 1 }
        );
	};

  tick(){
    this.setState({...this.state,elapsed: new Date() - this.state.start});
  }

  render() {
    let redirectVar = null;
    let errorMsg=null;
    if(localStorage.getItem('userid')){
      redirectVar = <Redirect to= "/" />
    }
    if(this.props.error){
      console.log("Error Msg Value : "+this.props.error);
      errorMsg = (
          <div className="myErrorMsg">
              Invalid Username/Password
          </div>
      );
  }
    return(
      <div onClick={this.incrementCount}>
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
                      <span>Do not have a Fandango Account?</span> &nbsp;<Link to = "/signup" className="cta">Sign Up</Link>
                    </div>
                  </div>
                </div>
              </nav>
            </header>
          </div>
          <div className="container">
            <form className="form-signin" onSubmit = {this.handleSubmit.bind(this)}>
              <h2 className="form-signin-heading">Please sign in</h2><br/>
              <p className="errMsg">{errorMsg}</p>
              <label htmlFor="inputEmail" className="sr-only">Email address</label>
              <input type="email" name = "email" id="inputEmail" onChange = {this.handleChange} className="form-control" placeholder="Email address" required="" autoFocus=""/>
              <br/>
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input onChange = {this.handleChange} type="email" name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required=""/>
              
              <input type="submit" value="Sign In" className="btn btn-primary form-control"/>

            </form>
          </div>
        </div>
  )}
}
const mapStateToProps = state => {
  return {
      id : state.id,
      error : state.error
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signinAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);