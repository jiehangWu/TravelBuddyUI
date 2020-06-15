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
        <User />
        <p>Welcome to Travel Buddy Covid-19 edition!</p>
        <Gmap />
        <Input />
      </div>
    );
  }
}

render(<App />, document.getElementById("app"));
