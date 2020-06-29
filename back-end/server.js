// server.js
const express = require('express');
const app = express();
const { ESLint } = require("eslint");

app.use(express.json()) // for parsing application/json
const eslint = new ESLint();

const port = 8000;

app.post('/code', async (req, res) => {
  results = await eslint.lintText(req.body.code)
  res.send({res: results[0]});
});

app.listen(port, () => {
  console.log('We are live on ' + port);
});