const nodemailer = require('nodemailer');
//const express = require('express');
const addon = require('./build/Release/my_addon');
const http = require('http');


const server = http.createServer((req, res) => {
    addon.hello();
    res.write('<p>I wrote an addon</p>');
    res.end();
});




server.listen(3000);