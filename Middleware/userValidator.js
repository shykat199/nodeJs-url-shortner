const {check, validationResult} = require('express-validator')
const createError = require("http-errors");

const User = require('../Models/userModel')

const userValidator = [
    check('userName')
        .isLength({min: 1})
        .withMessage("Name is required")
        .isAlpha('en-US', {ignore: " -"})
        .withMessage('Name contain anything rather than alphabet')
        .trim(),
    check('email')
        .isEmail()
        .withMessage("Invalid email address")
        .trim()
        .custom(async (email) => {
            try {
                const user = await User.findOne({
                    email: email
                })
                if (user) {
                    throw createError("Email already in use!");
                }
            } catch (error) {
                throw createError(error.message);
            }
        }),
    check('password')
        .trim()
]

const userValidationHandler = (req, res, next) => {
    const errors = validationResult(req)
    const mappedError = errors.mapped()

    if (Object.keys(mappedError).length === 0) {
        next()
    } else {
        req.session.errors = mappedError
        return res.redirect('/sign-up');
    }

}

module.exports ={
    userValidator,userValidationHandler
}