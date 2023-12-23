const express = require('express');
const cors = require('cors');
const routers = require('./routes/');


const app = express();

app.use(cors());
app.use(express.json({ extended: true, limit: '50mb' }));
app.use('/', routers);

module.exports = app;