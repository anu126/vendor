var express = require('express');
const mongoose = require("mongoose");
const app = express();
require("dotenv/config")
const router = require('./src/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.conf');
const port = process.env.PORT

app.use(express.json());

app.get('/', function(req,res) {
    res.json("working")
})

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
