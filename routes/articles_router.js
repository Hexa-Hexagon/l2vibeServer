const { article } = require('../controllers');
const { authenticate } = require('../middlewares/sign_and_verify_jwt');
const { Router } = require('express');
const multer = require('../middlewares/multer');


const router = Router();

router.get('/:offset', article.getArticles);
router.get('/id/:id', article.getArticle);
router.post('/', authenticate,  multer.single('avatar'), article.createArticle);
router.patch('/:id', authenticate, article.patchArticle);
router.delete('/:id', authenticate, article.deleteArticle);


module.exports = router;