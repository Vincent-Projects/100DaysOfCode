const express = require('express');

const constkey = require('./src/constkey');
const scopevar = require('./src/scopevar');
const extended = require('./src/extended');
const objects = require('./src/objects');

const app = express();

app.get('/', (req, res, next) => {
    let html = `
        <h1>ES6 Features :</h1>
        <h2>const keyword</h2>
        <p>With ES6 : ${constkey.value1}<p>
        <p>Without ES6 : ${constkey.value2}<p>
    `;
    res.send(html)
});

app.listen(3000);