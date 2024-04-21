const { article } = require('../models/');
const fs = require('fs');


module.exports.getArticles = async(request, response) => {
    try {
        const { offset } = request.params;
        const limit = 9;
        const count = Math.ceil(await article.countDocuments() / 9);
        if (offset >= count) {
            throw new Error('Offset is greater than the number of articles');
        }
        const articles = await article.find().select(['id', 'articleName', 'articleImage']).skip(offset * limit || 0).limit(limit);
        response.status(200).json({ count: count, articles: articles });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

module.exports.getArticle = async(request, response) => {
    try {
        const { params: { id } } = request;
        const getArticle = await article.findById(id);
        response.status(200).json(getArticle);
    } catch (error) {
        response.status(500).json(error);
    }
}

module.exports.createArticle = async(request, response) => {
    try {
        const { articleName, fileName } = request.body;
        const newArticle = await article.create({
            articleName: articleName,
            articleImage: fileName
        });
        response.status(200).json(newArticle);
    } catch (error) {
        response.status(500).json(error);
    }
}

module.exports.patchArticle = async(request, response) => {
    try {
        const { body, params: { id } } = request;
        const updatedArticle = await article.findByIdAndUpdate(id, body);
        response.status(200).json(updatedArticle);
    } catch (error) {
        response.status(500).json(error);
    }
}

module.exports.putArticle = async(request, response) => {
    try {
        const { body: { fileName, articleName, articleHtml}, params: { id }} = request;
        const findArticle = await article.findById(id);
        const updatedArticle = await article.findByIdAndUpdate(id, {
            articleName: articleName,
            articleHtml: articleHtml,
            articleImage: fileName
        });
        fs.unlinkSync(__dirname + `/../images/${findArticle.articleImage}`);
        response.status(200).json(updatedArticle);
    } catch (error) {
        response.status(500).json(error);
    }
}

module.exports.deleteArticle = async(request, response) => {
    try {
        const { params: { id } } = request;
        const deletedArticle = await article.findByIdAndDelete(id);
        fs.unlinkSync(__dirname + `/../images/${deletedArticle.articleImage}`);
        response.status(200).json(deletedArticle);
    } catch (error) {
        response.status(500).json(error);
    }
}
