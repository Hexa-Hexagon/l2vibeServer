const { Schema, model } = require('mongoose');


const articleSchema = new Schema({
    articleFileName: { type: String, required: true, min: 1, max: 64 },
    html: {type: String}
});


module.exports = new model('Articles', articleSchema);