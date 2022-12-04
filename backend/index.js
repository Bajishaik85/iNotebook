const connectToMongo = require('./db')
require("dotenv").config();
const express = require('express')
var cors = require('cors')
const bodyParser = require("body-parser");



connectToMongo();
const app = express()
const port = process.env.PORT || 5000;
app.use(cors())


app.use(express.json());

app.use(bodyParser.json());



//Available routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})