const express = require('express');
const { article } = require('../controllers');
const { authenticate } = require('../middlewares/sign_and_verify_jwt');


const router = express.Router();

router.use('/html', express.static('html'));
router.get('/', article.getArticles);
router.get('/:id', article.getArticle);
router.post('/', authenticate,  article.createArticle);
router.patch('/:id', authenticate, article.patchArticle);
router.delete('/:id', authenticate, article.deleteArticle);


module.exports = router;