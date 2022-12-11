const express = require('express');

const router = express.Router();
const taskControler = require('../controllers/task.ctrl');

router.route('/today')
  .get(taskControler.getToday);

router.post(taskControler.new);

router.route('/:task_id').delete(taskControler.taskDone);

router.route('/:task_id')
  .update(taskControler.taskImportance);

module.exports = router;
