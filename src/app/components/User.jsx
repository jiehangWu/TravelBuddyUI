import React, { Component } from "react";
// import axios from 'axios';

class User extends Component {
  constructor(props) {
	super(props);
	this.state = {
	  user: {
		name: ""
	  }
	};
	this.fetchUser = this.fetchUser.bind(this);
  }

  fetchUser() {
	async function getdisplayNameByIdAsync() {
		let response = await fetch("http://localhost:8080/users/1");
		let json = await response.json();
		return json
	}

	getdisplayNameByIdAsync()
		.then(json=> {
			this.setState({
				user: json
			});
		});
  }

  componentWillMount() {
	this.fetchUser();
  }

  render() {
	return (
	  <div className="user">
		<h1>Hello {this.state.user["displayName"]}</h1>
	  </div>
	);
  }
}

export default User;
