require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// Mount body-parser
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

function isValidURL(string) {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};


app.post("/api/shorturl", function(req, res) {
  console.log(req.body.url)
  const url = req.body.url
  
  if (!isValidURL(url)) {
    res.json({
      error: "invalid url",
    });
  } else {
    res.json({
      original_url: url,
      short_url: 1
    });
  }
});
