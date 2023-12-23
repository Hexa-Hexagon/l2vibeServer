const { Schema, model } = require('mongoose');


const serverSchema = new Schema({
    serverName: { type: String, required: true, min: 1, max: 64 },
    status: { type: String, required: true },
    difficulty: { type: String, required: true },
    version: { type: String, required: true },
    isAction: { type: Boolean, required: true },
    dateOfStartingServer: { type: Date, required: true },
    dateOfEndingContract: { type: Date, required: true, expires: 1 }
});


module.exports = new model('Servers', serverSchema);