const { Router } = require('express');
const { server } = require('../controllers/');
const { authenticate } = require('../middlewares/sign_and_verify_jwt');


const router = Router();

router.get('/', server.getServers);
router.post('', authenticate, server.createServer);
router.patch('/:id', authenticate, server.patchServer);
router.delete('/:id', authenticate, server.deleteServer);


module.exports = router;