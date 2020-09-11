const Task = require("../../../../database/models").task;
const User = require("../../../../database/models").user;

exports.addTask = async (req, res) => {
  const currentUser = req.user;
  if (!req.body.title || !req.body.description || !req.body.status || !currentUser) {
    return res.status(400).send({ message: "Bad Request" });
  }

  Task.create({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    userId: req.user.id
  }).then(
    data => res.send(data)
  ).catch(
    err => {
      res.status(500).send({ message: err.message || "Some error occurred while creating the TodoList." });
    }
  );
};

exports.editTask = async (req, res) => {
  const currentUser = req.user;
  if (!req.body.title || !req.body.description || !req.body.status || !currentUser) {
    return res.status(400).send({ message: "Bad Request" });
  }

  Task.findByPk(req.body.taskId).then(
    task => {
      if (task) {
        if (currentUser.dataValues.id == task.userId || currentUser.role == 'admin') {
          task.update({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,/* 
            userId: req.user.id */
          })
          return res.send(task);
        } else {
          return res.status(401).send({ message: "Unauthorized" });
        }
      } else {
        return res.status(404).send({ message: "Not found" });
      }
    }
  ).catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while creating the TodoList." });
  });

};

exports.deleteTask = async (req, res) => {
  const currentUser = req.user;
  if (!currentUser) {
    return res.status(400).send({ message: "Bad Request (No user)" });
  }

  Task.findByPk(req.query.taskId).then(
    task => {
      if (task) {
        if (currentUser.dataValues.id == task.userId || currentUser.role == 'admin') {
          return task.destroy().then(u => {
            return res.send(u);
          })
        } else {
          return res.status(401).send({ message: "Unauthorized" });
        }
      } else {
        return res.status(404).send({ message: "Not found" });
      }
    }
  ).catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while creating the TodoList." });
  });
};

//return All Task for current User Or All if admin 
exports.getAll = async (req, res) => {
  const currentUser = req.user;
  if (!currentUser) {
    return res.status(400).send({ message: "Bad Request (No user)" });
  }

  try {
    if (currentUser.role == 'admin') {
      const tasks = await Task.findAll({ where: true, include: [User] });
      return res.send(tasks);
    } else {
      const tasks = await Task.findAll({ where: { userId: req.user.dataValues.id }, include: [User] });
      return res.send(tasks);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message || "Some error occurred while retrieving the Tasks." });
  }

};

exports.getTask = async (req, res) => {

  const currentUser = req.user;
  if (!currentUser) {
    return res.status(400).send({ message: "Bad Request (No user)" });
  }

  try {
    if (currentUser.role == 'admin') {
      const task = await Task.findByPk(req.query.taskId);
      if (task) {
        return res.send(task);
      } else {
        res.status(404).send({ message: "Not found" });
      }
    } else {
      const task = await Task.findOne({ where: { id: req.query.taskId } }); //$and : [{userId: req.user.dataValues.id}, {id: req.query.taskId}]

      if (task.userId == currentUser.dataValues.id) {
        if (task) {
          return res.send(task);
        } else {
          return res.status(404).send({ message: "Not found" });
        }
      } else {
        return res.status(401).send({ message: "Unauthorized" });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message || "Some error occurred while retrieving the Tasks." });
  }

};