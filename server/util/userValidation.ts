import { User } from "../types/User";
import ErrorWithStatusCode from "./classes/ErrorWithStatusCode";

function validateUsername(name: string): boolean {
    // username must have at least 3 characters (letters and numbers only
    if(!name){
      throw new ErrorWithStatusCode("username required",400);
    }
    if(!name.match(/^[a-zA-Z0-9]{3,}$/)){
      throw new ErrorWithStatusCode( "Username must have at least 3 characters (letters and numbers only)",400);
    }
    return true;
    }
  
  function validateEmail(email: string): boolean {
    // email must have @ and . and at least 2 characters after the dot
    if(!email){
      throw new ErrorWithStatusCode("email required",400);
    }
    if(!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
      throw new ErrorWithStatusCode("email must have @ and . and at least 2 characters after the dot",400);
    }
    return true;
  }
  
  function validatePassword(password: string): boolean {
    // password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character
    if(!password){
      throw new ErrorWithStatusCode("password required",400);
    }
    if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
      throw new ErrorWithStatusCode("password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",400);
    }
    return true;
  }

  function validateRole(role: string): boolean {
    // role must be either buyer or seller
    if(!role){
      throw new ErrorWithStatusCode("role required",400);
    }
    if(!role.match(/^(buyer|seller)$/)){
      throw new ErrorWithStatusCode("role must be either buyer or seller",400);
    }
    return true;
  }
  
  // type is any till we have a user model
  function validateUser(user: User): boolean {
    return validateUsername(user.name) && validateEmail(user.email) && validatePassword(user.password) && validateRole(user.role) ;
  }
  
  export { validateEmail, validatePassword, validateUser };
  export default validateUser;  