const express = require('express');

const router = express.Router();
const stateControler = require('../controllers/state.ctrl');

router.post('/', stateControler.new);
router.put('/', stateControler.update);
router.get('/:userId', stateControler.get);

module.exports = router;
