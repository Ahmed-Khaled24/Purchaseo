function validateUsername(name: string): boolean {
    // username must have at least 3 characters (letters and numbers only
    return name.match(/^[a-zA-Z0-9]{3,}$/) ? true : false; 
  }
  
  function validateEmail(email: string): boolean {
    // email must have @ and . and at least 2 characters after the dot
    return email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) ? true : false;
  }
  
  function validatePassword(password: string): boolean {
    // password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character
    return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) ? true : false;
  }
  
  // type is any till we have a user model
  function validateUser(user: any): boolean {
    return validateUsername(user.name) && validateEmail(user.email) && validatePassword(user.password) ;
  }
  
  export { validateEmail, validatePassword, validateUser };
  export default validateUser;  