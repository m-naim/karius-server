const Task = require('../models/task');

module.exports = {
  new: (req, res, next) => {
    const newTask = new Task({
      name: req.body.name,
    });
    newTask.addUser(req.body.token);
    newTask.addList(req.body.list_id);
    newTask.save().then((data) => res.send(data))
      .catch(next);
  },
  getToday: (req, res, next) => {
    Task.find()
      .exec((err, data) => {
        if (err) res.send(err);
        else if (!Task) res.send(404);
        else res.send(data);
        next();
      });
  },
  taskDone: (req, res, next) => {
    console.log(req.params);
    Task.findById(req.params.task_id)
      .then((item) => item.remove().then(() => res.send({
        success: true,
      })))
      .catch((err) => {
        res.status(404).send({
          erreur: err,
        });
        next();
      });
  },
  taskImportance: (req, res, next) => {
    Task.findById(req.params.task_id)
      .then((item) => {
        item.change();
        item.save().then(() => res.send({
          success: true,
        }));
      })
      .catch((err) => {
        res.status(404).send({
          erreur: err,
        });
        next();
      });
  },
  taskDeadLine: (req, res, next) => {
    console.log(req.body);
    Task.findById(req.body.task_id)
      .then((item) => {
        console.log(item);
        item.setlimite(req.body.date);
        item.save().then(() => res.send({
          success: true,
        }));
      })
      .catch((err) => {
        res.status(404).send({
          erreur: err,
        });
        next();
      });
  },
};
