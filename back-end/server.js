// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { ESLint } = require("eslint");

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
app.use(express.json()) // for parsing application/json
const eslint = new ESLint();

const port = 8000;

app.use(express.static(__dirname + ""));


app.post('/code', async (req, res) => {

  results = await eslint.lintText(req.body.code)
  res.send({res: results[0]});

});

app.listen(port, () => {
  console.log('We are live on ' + port);
});