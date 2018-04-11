const express = require('express');
//routes thu vien restful API
const app = express();
//thu vien ket noi den database duoi localhost
const router = express.Router();
const mongoose = require('mongoose');
// them thu vien config database (goi qua config database)
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser');
const cors = require('cors');


mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('Could not connect to DB: ', err);
    }
    else {
        console.log('Connected to DB: ' + config.db)
    }
});

app.use(cors({
    origin: 'http//localhost:4200'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use('/authentication', authentication);
app.use(express.static(__dirname + '/client/dist/')); // Provide static directory for frontend

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(8080, () => {
    console.log('Listening port 8080');
});