function responseHtml(pageTitle){
    return (req,res,next)=>{
        res.locals.html=true;
        res.locals.pageTitle=`${pageTitle}`;
        res.locals.loggedInUser={};
        res.locals.errors={};
        res.locals.data={};
        next();
    }
}

module.exports ={
    responseHtml
}