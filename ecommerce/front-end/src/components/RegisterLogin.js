import React, { Component } from 'react';
import { Form, Button, Col, DropdownButton, ButtonGroup, MenuItem } from 'react-bootstrap';

const RegisterLogin = ()=>{
	return(
		<div className="loginForm">
		<h1>some login form</h1>
		<DropdownButton id="dropdown-btn-menu" bsStyle="success" title="Dropdown">
      		<MenuItem key="1">Dropdown link</MenuItem>
      		<MenuItem key="2">Dropdown link</MenuItem>
    	</DropdownButton>
		</div>
	)
} 

export default RegisterLogin;