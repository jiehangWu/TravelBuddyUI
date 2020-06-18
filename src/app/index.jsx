import React from "react";
import { render } from "react-dom";

import "./../scss/main.scss";

import User from "./components/User.jsx";
import Gmap from "./components/Gmap.jsx";
import { CommentList } from "./components/Comment.jsx";


class App extends React.Component {

  constructor(props) {
		super(props);
		this.state = {
			user: {
        id: "",
				displayName: ""
      },
      destination: {
        lat: 49,
        lng: -123
      }
    };
    
    this.setAppUser = this.setAppUser.bind(this)
    this.setAppDestination = this.setAppDestination.bind(this)
  }
  
  setAppUser(data) {
    this.setState({
      user: data
    });
    console.log("user set globally as:");
    console.log(this.state.user);
  }

  setAppDestination(data) {
    this.setState({
      destination: data
    });
    console.log("destination set globally as:");
    console.log(this.state.destination);
  }

  render() {
    return (
      <div className="home">
        <input id="input_useremail" placeholder="user email"/>
        <input id="input_userpassword" placeholder="user password"/>
        <User setAppUser={(data) => this.setAppUser(data)} />
        <p>Welcome to Travel Buddy Covid-19 edition! Please enter your destination:</p>
        <input id="input_lat" type="number" placeholder="latitude"/>
        <input id="input_lng" type="number" placeholder="longitude"/>
        <input id="input_range" type="number" placeholder="range"/>
        <Gmap setAppDestination={(data) => this.setAppDestination(data)} />
        <CommentList user={this.state.user} destination={this.state.destination} />
      </div>
    );
  }
}

render(<App />, document.getElementById("app"));
