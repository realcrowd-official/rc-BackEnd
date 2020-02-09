const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors');
require('dotenv').config();

const app = express();
const port = 7777;

const db = require('./db/index.js');
const api = require('./routes');

db();

app.use(cors({ origin: '*' }));
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', api);

app.get('/', (req, res) => {
  res.send('real-crowd');
});

app.listen(port, () => console.log(`working ${port}`));
