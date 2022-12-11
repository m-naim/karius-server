const express = require('express');

const router = express.Router();
const listControler = require('../controllers/list.ctrl');

router.post(listControler.newList);
router.route('/:id').delete(listControler.delList);
router.get(listControler.getAll);

module.exports = router;
