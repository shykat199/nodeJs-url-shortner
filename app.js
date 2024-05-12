const express = require('express')
const mongoose = require('mongoose')
const dontEnv = require('dotenv')
const cookieParser = require('cookie-parser')
const path = require('path')
const session = require('express-session')
const flash =  require('connect-flash')

const {notFoundHandler,errorHandler}=require('./Middleware/handelError')

const logInRoute = require('./routes/logInRoute')


const app = express();
dontEnv.config()

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(()=>{
        console.log("🚀 ~ Database connection established successfully");

    })
    .catch((error)=>{
        console.log("🚀 ~ err:", error);
    })


app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser(process.env.COOKIES_SACRET))
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))
app.use(session({
    secret:process.env.SESSION_SACRET,
    cookie:{
        maxAge:60000,
    },
    resave:false,
    saveUninitialized:true
}))
app.use(flash())

app.use('/',logInRoute);



app.use(notFoundHandler)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log("🚀 ~ process.env.APP_PORT:", process.env.PORT);

})