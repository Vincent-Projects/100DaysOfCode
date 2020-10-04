const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const routes = require('./src/routes');

if (process.env.NODE_ENV === 'development')
    require('dotenv').config({ path: './config/config.env' });

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


const app = express();

app.use(cors());
app.use(express.json());


app.use('/v1', routes);


mongoose.connect(MONGO_URI, { useNewUrlParser: true })
    .then(success => {
        if (!success) {
            console.log(success);
            const error = new Error("Can't connect to database");
            error.statusCode = 500;
            throw error;
        }

        app.listen(PORT, () => {
            console.log("server started on port" + PORT);
        });
    }).catch(err => {
        console.log(err);
        app.listen(PORT, () => {
            console.log(process.env.MONGO_URI);
        })
    })