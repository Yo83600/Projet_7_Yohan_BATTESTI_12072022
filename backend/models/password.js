// création d'un models pour le mot de passe
const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(10)                                    
.is().max(100)                                  
.has().uppercase()                              
.has().lowercase()                             
.has().digits(2)                                
.has().not().spaces()                    

module.exports = passwordSchema;