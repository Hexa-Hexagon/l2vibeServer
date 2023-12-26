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
            const { link, fileName } = request.body;
            const newBanner = await banner.create({
                bannerLink: link,
                bannerFileName: fileName
            });
            response.status(200).send(newBanner);
        } else {
            response.json('');
        }
    } catch (error) {
        response.status(500).send(error);
    }
}

module.exports.putBanner = async(request, response) => {
    try {
        if(request.file) {
            const { params: { id }, body: { link, fileName } } = request;
            const findBanner = await banner.findById(id);
            fs.unlinkSync(__dirname + `/../images/${findBanner.bannerFileName}`);
            const updatedBanner = await banner.findByIdAndUpdate(id, {
                bannerLink: link,
                bannerFileName: fileName
            });
        if (!updatedBanner) {
            return response.status(404).send({ error: 'Banner not found' });
        }
        response.status(200).send(updatedBanner);
    } else {
        response.status(400).json({ error: 'No file provided' });
    }
    } catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
}

module.exports.patchBanner = async(request, response) => {
    try {
            const { params: { id }, body: { link } } = request;
            const updatedBanner = await banner.findByIdAndUpdate(id, {
                bannerLink: link,
            });
        if (!updatedBanner) {
            return response.status(404).send({ error: 'Banner not found' });
        }
        response.status(200).send(updatedBanner);
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