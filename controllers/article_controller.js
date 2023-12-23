const { article } = require('../models/');
const { sendError } = require('../middlewares/send_error');


module.exports.getArticles = async(request, response) => {
    try {
        const articles = await article.find().select(['id', 'articleFileName']);
        response.status(200).send(articles);
    } catch (error) {
        response.status(500).send(error);
    }
}

module.exports.createArticle = async(request, response) => {
    try {
        const { body } = request;
        const newArticle = await article.create(body);
        response.status(200).send(newArticle);
    } catch (error) {
        response.status(500).send(error);
    }
}

module.exports.patchArticle = async(request, response) => {
    try {
        const { body, params: { id } } = request;
        const updatedArticle = await article.update(id, body);
        response.status(200).send(updatedArticle);
    } catch (error) {
        response.status(500).send(error);
    }
}

module.exports.deleteArticle = async(request, response) => {
    try {
        const { params: { id } } = request;
        const deletedArticle = await article.delete(id);
        response.status(200).send(deletedArticle);
    } catch (error) {
        response.status(500).send(error);
    }
}