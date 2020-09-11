const bcrypt = require('bcryptjs');
const User = require("../../../../database/models").user;

exports.register = async (req, res) => {

  // Validate fields
  /* if (!isValid) {
    return res.status(422).json(errors);
  } */
 console.log(req.body);
  const user = User.create({
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash( req.body.password, bcrypt.genSaltSync(8)) //generate password Hash with bcryptjs
  }).then(
    data => res.send(data)
  ).catch(
    err => {
      console.log(err);
      res.status(500).send({message: err.message || "Some error occurred while creating the TodoList."});
    }  
  );

};
