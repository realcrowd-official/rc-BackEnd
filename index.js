const express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  cors = require('cors');

const app = express();
const port = 7777;

const api = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', api);

app.get('/', (req, res) => {
  res.send('real-crowd');
});

app.listen(port, () => console.log(`working ${port}`));
