// Require the express module
const express = require('express');
const Sass = require('./sass');
const config = require('./config.json');
let fs= require('fs'); // import the fileSystem library
let bodyParser = require('body-parser'); // import body-parser (to read sent data from clients)

// Create a new web server
const app = express();
// Tell the web server to serve files
// from the www folder
app.use(express.static('www'));
// Start the web server on port 3000
app.listen(3000,() => console.log('Listening on port 3000'));

// Serve the index page everywhere so that the
// frontend router can decide what to do
const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './www/index.html'));
});

for(let conf of config.sass){
    new Sass(conf);
}

app.use(bodyParser.json()); // use body-parser
app.use(bodyParser.urlencoded({ extended: false })); // configure body-parser

let highscores = require('./www/json/highscoreonly.json'); // load the json file - store it in a new variable
 
// add a route that the browsers/clients can communicate through
app.post('/add-score', (req, res) => {
  highscores.push(req.body); // add the new score
  highscores.sort(function(a,b){
    return b.score - a.score; // Google MDN js array sort and write the sort-function
  });
  highscores = highscores.slice(0,10); // only keep the top 10 in the array
  fs.writeFile('./www/json/highscoreonly.json', JSON.stringify(highscores), ()=>{}); // replace the file content with the new array
  res.json(highscores); // respond to the browser, send the new/updated array
});