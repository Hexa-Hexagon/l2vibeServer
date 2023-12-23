const { Schema, model } = require('mongoose');


const bannerSchema = new Schema({
    bannerFileName: { type: String, required: true, min: 1, max: 64 },
    bannerLink: { type: String, required: true, min: 1, max: 128 }
});


module.exports = new model('Banners', bannerSchema);