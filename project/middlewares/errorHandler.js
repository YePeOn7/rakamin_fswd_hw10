function errorHandler(err, req, res, next){
    console.log(`Trigger Error:`);
    console.log(err);
    if(err.name === "badRequest"){
        res.status(400).json(err);
    }
    else if(err.name === "notFound"){
        res.status(404).json(err);
    }
    else if(err.name === "noDataFound"){
        res.status(404).json(err);
    }
    else if(err.name === "unauthenticated"){
        res.status(403).json(err);
    }
    else if(err.name === "unauthorized"){
        res.status(401).json(err);
    }
    else{
        res.status(500).json({message: "Internal Server Error", error: err});
    }
}

module.exports = errorHandler;