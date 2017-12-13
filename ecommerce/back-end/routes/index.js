var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config/config');
var bcrypt = require('bcrypt-nodejs');//for hashing and checking password
var randToken = require('rand-token');//to include a random number into generator
var connection = mysql.createConnection(config);
connection.connect((error)=>{
	(!error) ? console.log('db connection=success!') : console.log(error)
});//connecting to our database


console.log(randToken.uid(100));
/* GET home page. */
router.post('/register', function(req, res, next) {
	const userData = req.body;
	console.log('someone showed up on register page - this must be from our react app, specifically /register form ', userData)
	//that means someone is trying to register, we need to insert their data into 2 tables: user table-
	//user's table needs their customer ID from the customer Table.
	//password, which needs to be hashed,
	//email,
	//arbitrary token which Express will create
	// 2. Customer's table:
	//name, city, state, salesRep, creditLimit
	// First - check to see if the user is already in users table res.json({msg: "userExists"})
	// if they aren't... insert users into customers first
	// res.json({msg:"userInserted", token: token})
	console.log(userData.email)
	//we use email to see if user exists
	const checkEmail = new Promise((resolve, reject)=>{
		const checkEmailQuery = `SELECT * FROM users WHERE email = ?;`;
		connection.query(checkEmailQuery, [userData.email], (error, results)=>{
			if (error){
				console.log('error with db', error)
				throw error; //for development - stop!
				//reject(error) // inproducation
			}else if(results.length > 0){
				// user exists already.goodbye
				console.log('user already in db', results)
				reject({
					msg: "userExists"
				})
			}else{
				//no error, no user, resolve (we do not care about results)
				resolve()
			}
		});
	});
		checkEmail.then(()=>{//then - function to run once promiss is complete
			//code to run if our check Email resolves
			console.log("User is not in the db")
			const insertIntoCust = `INSERT INTO customers (customerName, city, state, salesRepEmployeeNumber, creditLimit) VALUES (?,?,?,?,?);`;
			connection.query(insertIntoCust, [userData.name, userData.city, userData.state, 1337, 1000000], (error, results)=>{
				if (error){
					throw error; //throw error will stop programm
				}
				// get the cx id that was just inserted(from results)
				console.log(results.insertId)
				const newId = results.insertId;//that is a customer's id
				const token = randToken.uid(60);//set up a random string for the user's token,
				//we will store it into DB.
				const hash = bcrypt.hashSync(userData.password);
				//hashsync will create a blowfish/crypt (something evil)
				const insertUsers = `INSERT INTO users (cid, type, password, token, email) VALUES (?,?,?,?,?);`;
				connection.query(insertUsers, [newId, 'customer', hash, token, userData.email], (error)=>{
					if (error){
						throw error; // dev only
					}else{
						// if we get this far.. this is going to be what's inside of the authReducer
						res.json({
							token: token,
							name: userData.name,
							msg: "registerSuccess"
						})
					}
				})

			})

		}).catch((error)=>{
			//code to run if checkEmail rejects - user already exist
				console.log('error');
				res.json(error)
		})
});

module.exports = router;

