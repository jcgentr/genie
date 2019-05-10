const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const upload = require('./controllers/upload');
// const profile = require('./controllers/profile');

// connect this server to database
const db = knex({
  client: 'pg',
  connection: {
    // #### heroku psql connection ####
    // connectionString: process.env.DATABASE_URL,
    // ssl: true
    // #### local dev ####
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test123',
    database : 'genie'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

/*              ROUTES        */
// root
app.get('/', (req, res) => {
  res.send('It is working!!');
  // console.log(db.select('*').from('users'));
});

// send sensitive info over HTTPS POST and hash/encrypt passwords
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
// more advanced way of writing these routes
app.post('/register', register.handleRegister(db, bcrypt));
app.post('/upload', upload)

app.listen(3000, () => {
	console.log('app is running on port 3000');
});