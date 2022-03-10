const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const cors = require('cors');
const knex = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send("It's working!")})
app.post('/signin', (req, res) => {signin.handleSingin(req, res, knex, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, knex, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGET(req, res, knex)})
app.put('/image', (req, res) => {image.handleImage(req, res, knex)})

app.listen(process.env.PORT || 3000, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
});