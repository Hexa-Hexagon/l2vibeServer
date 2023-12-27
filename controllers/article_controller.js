const { article } = require('../models/');


module.exports.getArticles = async(request, response) => {
    try {
        const articles = await article.find().select(['id', 'articleName']);
        response.status(200).json(articles);
    } catch (error) {
        response.status(500).json(error);
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
        const { body } = request;
        const newArticle = await article.create(body);
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

module.exports.deleteArticle = async(request, response) => {
    try {
        const { params: { id } } = request;
        const deletedArticle = await article.findByIdAndDelete(id);
        response.status(200).json(deletedArticle);
    } catch (error) {
        response.status(500).json(error);
    }
}