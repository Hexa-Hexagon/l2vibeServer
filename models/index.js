const mongoose = require('mongoose');
const { DB } = require('../config');
const server = require('./server_model');
const banner = require('./banner_model');
const article = require('./article_model');


const connect = async() => {
    try {
        const connectionString = `mongodb://${DB.HOST}:${DB.PORT}/${DB.NAME}`;
        await mongoose.connect(connectionString);
    } catch (error) {
        console.log(error);
    }
}

connect();


module.exports = { server, banner, article };