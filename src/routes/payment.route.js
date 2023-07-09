const { currentUser, stores, transactions } = require('../controller/payment');

const router = require('express').Router();

router.get('/stores', stores );
router.get('/:id', currentUser );
router.post('/', transactions );


module.exports = router;