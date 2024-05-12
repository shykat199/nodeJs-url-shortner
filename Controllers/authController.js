const bcrypt = require('bcryptjs')

const User = require('../Models/userModel')


function getLogInPage(req, res, next) {
   let successMessage = req.flash('success');
    res.render('login',{
        successMessage:successMessage,
    })
}

function getSignUpPage(req, res, next) {
    const errors = req.session.errors;
    res.render('signUp',{
        errors:errors
    })
}

async function registerNewUser(req, res, next) {
    let newUser
    let hashedPassword = await bcrypt.hash(req.body.password, 10)

    newUser = new User({
        ...req.body,
        password: hashedPassword,
    })

    try {
        const result = await newUser.save()
        req.flash('success', 'User has been registered successfully.');

        res.redirect('/login')

    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong.'+err
        })
    }

}


module.exports = {
    getLogInPage,
    getSignUpPage,
    registerNewUser
}