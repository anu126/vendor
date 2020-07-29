var express = require('express');
const mongoose = require("mongoose");
const app = express();
require("dotenv/config")
const port = process.env.PORT
const router = require('./src/routes');
app.use(express.json());

app.get('/', function(req,res) {
    res.json("working")
})

app.use(router);

const options = {
    useNewUrlParser: true ,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DB_URL, options)
const db = mongoose.connection;

db.once('open', () => {
    console.log("DB Connected");
    app.listen(port, () => {
        console.log("server listening to", port)
    });
})

db.on('error', console.error.bind(console, 'connection-error'));
