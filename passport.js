const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('./models/user');

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