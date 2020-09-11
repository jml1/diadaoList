const User = require("../../../../database/models").user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  // Find user by email
  User.findOne({where: { email: req.body.email } }).then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json("user not found");
    }

    // Check Password
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {
        // Matched Password
        const payload = { id: user.id, username: user.name, email: user.email }; // Create JWT Payload

        // Sign Token
        jwt.sign(payload, "secret", { expiresIn: 3600 }, (err, token) => {
          return res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        // errors.password = "Password incorrect";
        return res.status(400).json("Password Incorrect");
      }
    });
  });
};

exports.currentUser = (req, res) => {
  return res.json({
    id: req.user.id,
    username: req.user.name,
    email: req.user.email
  });
};
