const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const cors = require('cors')
const knex = require('knex');
const { response } = require('express');
const register = require('./controllers/register')
const signIn = require('./controllers/signIn')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      },
    }
  });

app.use(bodyParser.json())
app.use(cors())

//home route
app.get('/', (req, res) => {res.send('it is working!')})

// Login route
app.post('/signin', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt) })

//register route
app.post('/register', (req, res) => { register.handleRegister(req, res, db, saltRounds, bcrypt) })

//the profile page route
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

//update the user account when they submit an image to increase their entries.
app.put('/image', (req, res) => { image.submitImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, ()=> {console.log(`app is running on port ${process.env.PORT}`)})