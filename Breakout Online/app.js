// Require the express module
const express = require('express');
const Sass = require('./sass');
const config = require('./config.json');

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

