const main = {};

main.registerController = require("../http/controllers/auth/registerController");
main.loginController = require("../http/controllers/auth/loginController");
main.taskController = require("../http/controllers/task/taskController");

module.exports = main;
