const express = require('express');
const { banner } = require('../controllers');
const multer = require('../middlewares/multer');
const { authenticate } = require('../middlewares/sign_and_verify_jwt');


const router = express.Router();

router.use('/images', express.static('images'));
router.get('/', banner.getBanners);
router.post('/', authenticate,  multer.single('avatar'), banner.createBanner);
router.put('/:id', authenticate, multer.single('avatar'), banner.putBanner);
router.patch('/:id', authenticate, banner.patchBanner);
router.delete('/:id', authenticate, banner.deleteBanner);


module.exports = router;