import React from "react";
import { render } from "react-dom";

import "./../scss/main.scss";

import User from "./components/User.jsx";
import Gmap from "./components/Gmap.jsx";
import { Input } from "./components/Comment.jsx";


class App extends React.Component {
  render() {
    return (
      <div className="home">
        <input id="input_useremail" placeholder="user email"/>
        <input id="input_userpassword" placeholder="user password"/>
        <User />
        <p>Welcome to Travel Buddy Covid-19 edition! Please enter your destination:</p>
        <input id="input_lat" type="number" placeholder="latitude"/>
        <input id="input_lng" type="number" placeholder="longitude"/>
        <input id="input_range" type="number" placeholder="range"/>
        <Gmap />
        <Input />
      </div>
    );
  }
}

render(<App />, document.getElementById("app"));
