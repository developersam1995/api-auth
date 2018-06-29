const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('./models/user');
const LocalStrategy = require('passport-local').Strategy;

// jwt strategy
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: 'iamsam'
}, async (payload,done)=>{
  try{
    //find the user specified in token
    const user = await User.findById(payload.subject);
    
    //if user doesnt exist handle
    if(!user) {
      return done(null,false);
    }

    //otherwise return user
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

//local strategy

passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) =>{
  //find user given email
  const user = await User.findOne({email});

  //  if not handle
  if(!user) {
    return done(unll, false);
  }

  // check if pswd is correct
 
  //ifnot

  //return user
}));