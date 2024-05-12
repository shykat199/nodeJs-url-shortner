const express = require('express')


const {getLogInPage,getSignUpPage,registerNewUser}=require('../Controllers/authController')
const {responseHtml}=require('../Middleware/htmlResponse')
const {userValidator,userValidationHandler}= require('../Middleware/userValidator')

const route = express.Router();

route.get('/login',responseHtml('Login'),getLogInPage)
route.get('/sign-up',responseHtml('Sign Up'),getSignUpPage)
route.post('/sign-up',userValidator,userValidationHandler,registerNewUser)



module.exports = route