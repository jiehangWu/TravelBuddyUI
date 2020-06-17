import React, { Component } from "react";
import axios from 'axios';

class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			usercre: {
				email: "unknown",
				password: ""
			},
			user: {
				displayName: ""
			}
		};
	}

	fetchUser() {
		if (this.state.usercre.email != "unknown") {
			console.log(`Calling http://localhost:8080/users/${this.state.usercre.email}/${this.state.usercre.password}`)
			axios.get(`http://localhost:8080/users/${this.state.usercre.email}/${this.state.usercre.password}`)
			.then(res => {
				console.log(res)
				this.setState({
					user: res.data
				});
			});
		}
	}

	render() {
		return (
			<div className="user">
				<button onClick={() => {
					const uemail = document.getElementById("input_useremail").value
					const upw = document.getElementById("input_userpassword").value
					this.setState({
						usercre:{
							email: uemail,
							password: upw
						}
					});
					this.fetchUser()
				}}>Login</button>
				<h1>Hello {this.state.user["displayName"]}</h1>
			</div>
		);
	}
}

export default User;
