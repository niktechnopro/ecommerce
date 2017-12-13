var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config/config');
var bcrypt = require('bcrypt-nodejs');
var connection = mysql.createConnection(config);
connection.connect((error)=>{
	(!error) ? console.log('db connection=success!') : console.log('error')
});//connecting to our database



/* GET home page. */
router.post('/register', function(req, res, next) {
	console.log('someone showed up on register page - this must be from our react app, specifically /register form')
	//that means someone is trying to register, we need to insert their data into 2 tables: user table-
	//user's table needs their customer ID from the customer Table.
	//password, which needs to be hashed,
	//email,
	//arbitrary token which Express will create

	// 2. Customer's table:
	//name, city, state, salesRep, creditLimit
	console.log(req.body)
	// First - check to see if the user is already in users table res.json({msg: "userExists"})
	// if they aren't... insert users into customers first
	// res.json({msg:"userInserted", token: token})


	// const name = req.body.name;
	// const email = req.body.email;
	// const accountType = req.body.account;
	// const password = req.body.password;
	// const city = req.body.city;
	// const state = req.body.state;
	// const salesRep = req.body.employee;
	// var hash = bcrypt.hashSync(password)
	// console.log(name,email,accountType,hash,city,state,salesRep)
	// let thePromise = new Promise((resolve, reject)=>{
	// 	const insertQuery = `INSERT INTO ecommerce (name, email, accountType, password, city, state, salesRep) VALUES (?,?,?,?,?,?,?);`;
	// 	connection.query(insertQuery, [name, email, accountType, hash, city, state, salesRep], (error)=>{
	// 		(!error) ?  resolve({msg: "success"}) : reject("there is an error", error);
	// 	})
	// })
	// thePromise.then((value)=>{
	// 	console.log("after then", value)//value=msg: "success" from above
	// 	res.json(value)
		// const selectQuery = `SELECT * FROM ecommerce;`;
		// connection.query(selectQuery, (error, results)=>{
		// 	(!error) ? res.json(results) : (console.log("error reading from database",error));
		// })
	})
	
});

module.exports = router;

