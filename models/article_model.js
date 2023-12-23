const { Schema, model } = require('mongoose');


const articleSchema = new Schema({
    articleName: { type: String, required: true, min: 1, max: 64 },
    articleHtml: {type: String}
});


module.exports = new model('Articles', articleSchema);