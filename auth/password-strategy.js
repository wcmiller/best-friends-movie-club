import Local from 'passport-local';
import { findUser, validateUser } from './user';

export const localStrategy = new Local.Strategy(async function(email, password, done){
  try{
    const user = await findUser(email);
    if(user && validateUser(user, password)){
      done(null, user);
    } else {
      done(new Error('Invalid email/password combination'));
    }
  } catch(error){ 
    done(error); 
  }
});