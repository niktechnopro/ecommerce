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

router.post('/login', (req, res, next)=>{
	console.log(req.body)//can be also after res.json
	const email = req.body.email;
	const password = req.body.password;

	const checkLoginQuery= `SELECT * FROM users
	INNER JOIN customers ON users.cid = customers.customerNumber
	WHERE users.email = ?;`;//specified email as email is in both tables
	//that was just one line above
	connection.query(checkLoginQuery, [email], (error, results)=>{
		if(error){
			throw error;
		}else if(results.length === 0){
			// this user is not in database
			res.json({
				msg:"badUser"
			})
		}else{
			//this email is valid, see if the password is...
			// password is the english they gave us on the form
			// result[0].password is what we have for this user in the DB
			const checkHash = bcrypt.compareSync(password, results[0].password);
			const name = results[0].customerName;
			if (checkHash){
				// these are the droids we are looking for.
				// create a new token.
				// update their row in the DB with the token
				// send some json back to react/ajax/axios
				const newToken = randToken.uid(100);
				const updateToken = `UPDATE users SET token = ? WHERE email=?;`;
				connection.query(updateToken, [newToken, email], (error)=>{
					if (error){
						throw error;
					}else{
					res.json({
						msg: "login Success",
						token: newToken,
						name: name
						})
					}
				})
			}else{
				//you don't want to sell me deathsticks. You want to go home and rethink your life
				res.json({
					msg: "wrongPassword"
				})
			}
		}
	})
	// res.json(req.body);
})


console.log(randToken.uid(100));//use it as a replacment for uid - a 100 character token = length
// randToken will be used instead of sessions here

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
				console.log('user id in customers database', results.insertId)
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

router.get('/productlines/get', (req, res, next)=>{
	console.log('someone showed up at productlines/get')
	const selectQuery=`SELECT * FROM productlines`;
	connection.query(selectQuery, (error, results)=>{
		if(error){
			throw error
		}else{
			res.json(
				// msg: "it works!"
				results
			)
		}
	})
})

router.get('/productlines/:productlines/get', (req, res, next)=>{
	const pl = req.params.productline //extraction from query
	var plQuery = `SELECT * FROM productlines
		INNER JOIN products ON productlines.productLine = products.productLine
		WHERE productlines.productline = ?;`;
	connection.query(plQuery, [pl], (error, results)=>{
		if (error){
			throw error //dev only
		}else{
			res.json(results);
		}
	})
})


router.post('/fakelogin', (req, res, next)=>{
	const getFirstUser = `SELECT * FROM users limit 1;`;
	connection.query(getFirstUser, (error, results)=>{
		if (error){
			throw error
		}else{
			res.json({
				msg: "success",
				token: results[0].token,
				email: results[0].email
			})
		}
	})
})

router.post('/getCart', (req, res, next)=>{
	const token = req.body.token;
	const getUidQuery = `SELECT id from users WHERE token = ?;`;
	connection.query(getUidQuery, [userToken], (error, results)=>{
		if(error){//dev only
			throw error
		}else if (results.length === 0){
			res.json({
				msg: "badToken"
			})
		}else{
			//Get the user's id for the last query
			const uid = results[0].id;
			//this is a good token. I know who this is now
			const getCartTotals 
		}
	})
})

const getCartProducts = `SELECT * FROM cart INNER JOIN products ON 
			products.productCode = cart.ProductCode WHERE cart.uid =?;`;
	connection.query(getCartProducts, [uid], (error, cartContents)=>{
		if(error){
			throw error; //dev only
		}else{
			var finalCart = cartReslts[0];
			finalCart.products = cartContents;
			res.json(finalCart)
		}
	})

module.exports = router;

