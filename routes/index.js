const server = require('./server_router');
const article = require('./articles_router');
const banner = require('./banner_router');
const { admin } = require('../controllers/');
const express = require('express');


const router = express.Router();

router.use('/images', express.static('images'));
router.use('/servers/', server);
router.use('/banners/', banner);
router.use('/articles/', article);
router.post('/password', admin.login);


module.exports = router;