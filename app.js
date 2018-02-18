global.flag=true;
const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT||4000;
const users = require('./routes/users')
const config = require('./config/database')

//Connect to Database
mongoose.connect(config.database,{ useMongoClient: true });

//listenig to connected event
mongoose.connection.on('connected', () => {
    console.log('Connected to database: '+ config.database);
});

mongoose.connection.on('error', (err) => {
    console.log("Error:: " + err);
});
//CORS Middleware
app.use(cors());

//Bosy Parser Middleware
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
  }))

//passport  Middleware

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport,users.User);

app.use('/users', users);
//set static Folder

app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
    res.send("Will Be updated soon");
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
});

app.listen(PORT, () => {
    console.log("Server is running on Port :: " + PORT);
});