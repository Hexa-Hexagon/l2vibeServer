const { article } = require('../controllers');
const { authenticate } = require('../middlewares/sign_and_verify_jwt');
const { Router } = require('express');
const multer = require('../middlewares/multer');


const router = Router();

router.get('/', article.getArticles);
router.get('/:offset', article.getArticles);
router.get('/id/:id', article.getArticle);
router.post('/', authenticate,  multer.single('avatar'), article.createArticle);
router.patch('/:id', authenticate, article.patchArticle);
router.put('/:id', authenticate, multer.single('avatar'), article.putArticle);
router.delete('/:id', authenticate, article.deleteArticle);


module.exports = router;
