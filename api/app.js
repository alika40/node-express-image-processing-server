const express = require('express');
const path = require('path');
const router = require('./src/router');

const app = express();

const pathToIndex = path.resolve(__dirname, '../client/index.html');
const pathToUpload = path.resolve(__dirname, 'uploads');


app.use('/', router);
app.use( express.static(pathToUpload) );
app.use('/*', function(request, response) {
    response.sendFile(pathToIndex);
});


module.exports = app;