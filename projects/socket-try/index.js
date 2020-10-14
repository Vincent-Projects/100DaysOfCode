const express = require('express');
const openSocket = require('socket.io-client');
const bodyParser = require('body-parser');

const app = express();
const messages = [];

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', "GET, POST");
    res.setHeader('Access-Control-Allow-Headers', "Content-Type");
    next();
});
const io = require('socket.io')(app.listen(3000));
//app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res, next) => {
    res.status(200).json({
        messages: messages,
        io: io
    });
});




io.on('connect', socket => {
    console.log("New User Connected !");
});

app.post('/new-message', (req, res, next) => {
    messages.push({
        user: req.body.name,
        message: req.body.message
    });
    io.emit('post', {
        action: "new",
        message: {
            user: req.body.name,
            message: req.body.message
        }
    })
    res.redirect('/');
});