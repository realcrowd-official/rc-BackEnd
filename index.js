const express = require('express');

const app = express();
const port = 3000;

const api = require('./routes');

app.use('/api', api);
app.get('/', (req, res) => {
  res.send('real-crowd');
});

app.listen(port, () => console.log(`working ${port}`));
