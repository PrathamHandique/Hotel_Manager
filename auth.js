const passport = require("passport"); //import passport
const LocalStrategy = require("passport-local").Strategy; //import passport local
const Person = require("./models/person"); //import person model


passport.use(
  new LocalStrategy(async (USERNAME, password, done) => {
    try {
      //console.log("Recieved Credentials", USERNAME, password);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (err) {
        return done(err);
    }
  })
);
module.exports = passport;
