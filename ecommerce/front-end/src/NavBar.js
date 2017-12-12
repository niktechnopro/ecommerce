import React, { Component } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
class NavBar extends Component{
	constructor(){
		super();
	}
	render(){
		return(
			<div id="navbar">
				<nav className="navbar navbar-fixed-top">
              			<div className="container-fluid navbar-white">
              			<div className="links">
	                		<ul className="nav navbar-nav">
	                			<li><Link to="/">Home</Link></li>
	                			<li><Link to="/shop">Shop</Link></li>
	                			<li><Link to="/contact">Contact Us</Link></li>
	                			<li><Link to="/login">Login</Link></li>
	                		</ul>
	                	</div>
                	</div>
                	<div className="container-fluid navbar-default">
                		<div className="container">
	                		<div className="nav navbar-header logo">
	                			ClassicModels Logo
	                		</div>
	                		<div className="nav navbar-nav pull-right">
	                			<li>Sign in or Create Account</li>
	                			<li>(0) items in cart | ($0.00)</li>
	                		</div>
	                	</div>
                	</div>
                </nav>
			</div>
		)
	}
}

export default NavBar;