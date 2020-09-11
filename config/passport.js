const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../database/models").user;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
opts.passReqToCallback = true;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (req, jwt_payload, done) => {
      User.findByPk(jwt_payload.id)
        .then(user => {
          
          if (user) {
            req.user = user;
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err)); 
    })
  );
};
