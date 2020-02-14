const fs = require('fs');
const express = require('express');
const path = require('path');
//const http = require("http");
const hbs = require('hbs');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8888
const app = express();

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let artistsjson;

const r = () => fs.readFile('artists.json', (err, data) => {
  try {
    artistsjson = JSON.parse(data);
  } catch (error) {
    artistsjson = [];
  }
});
r();

const w = (data) => fs.writeFile('artists.json', data, (err) => {
  if (err) throw err;
});

app.get('/', (req, res) => {
  res.render('lab5', {name: 'Tobi'});
});

app.get('/aj', (req, res) => {
  res.send(artistsjson);
});

app.post('/aj', (req, res) => {
  artistsjson.push(req.body);
  w(JSON.stringify(artistsjson, null, 2));
});

app.post('/', (req, res) => {
  artistsjson.splice(req.body.num, 1);
  w(JSON.stringify(artistsjson, null, 2));
});

app.listen(port, () => {
	console.log(`Server is up on the port ${port}`);
});