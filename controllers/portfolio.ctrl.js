const Portfolio = require('../models/portfolio');

module.exports = {
  new: (req, res) => {
    const newTask = new Portfolio({
      name: req.body.name,
    });
    newTask.addUser(req.body.token);
    newTask.addList(req.body.list_id);
    newTask.save().then((data) => res.send(data))
      .catch(next);
  },

};
