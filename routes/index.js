const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth   = require("./auth/index");
const task   = require("./task/index");

router.use("/auth", auth);
router.use("/task", passport.authenticate('jwt', {session: false}), task); 

module.exports = router;
