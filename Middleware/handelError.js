const createError = require('http-errors')

function notFoundHandler(req,res,next){
    next(404,"Requested content not found.");
}

function errorHandler(err,req,res,next){
    res.locals.error = process.env.NODE_ENV === "development" ? err : { message: err.message };

    res.status(err.status || 500)

    if (res.locals.html){
        res.render("404", {
            title: "Error Page",
        });
    }else{
        res.json(res.locals.error);
    }
}


module.exports={
    notFoundHandler,
    errorHandler
}