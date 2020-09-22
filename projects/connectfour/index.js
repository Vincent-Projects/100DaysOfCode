const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.post('/minmax', (req, res, next) => {
    console.log(req.body);
});


app.listen(3000);