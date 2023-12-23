const { banner } = require('../models/');
const fs = require('fs');


module.exports.getBanners = async(request, response) => {
    try {
        const banners = await banner.find();
        response.status(200).send(banners);
    } catch (error) {
        response.status(500).send(error);
    }
}

module.exports.createBanner = async(request, response) => {
    try {
        if(request.file) {
            await banner.findOneAndDelete({ bannerFileName: request.file.originalname });
            const { link } = request.body;
            const newBanner = await banner.create({
                bannerLink: link,
                bannerFileName: request.file.originalname
            });
            response.status(200).send(newBanner);
        } else {
            response.json('');
        }
    } catch (error) {
        response.status(500).send(error);
    }
}

module.exports.deleteBanner = async(request, response) => {
    try {
        const { params: { id } } = request;
        const deletedBanner = await banner.findByIdAndDelete(id);
        if (!deletedBanner) {
            return response.status(404).send({ error: 'Banner not found' });
        }
        fs.unlinkSync(__dirname + `/../images/${deletedBanner.bannerFileName}`);
        response.status(200).send(deletedBanner);
    } catch (error) {
        response.status(500).send(error);
    }
}