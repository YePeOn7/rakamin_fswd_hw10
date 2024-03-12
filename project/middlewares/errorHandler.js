function errorHandler(err, req, res, next){
    console.log(`Trigger Error:`);
    console.log(err);
    if(err.name === "Internal Server Error"){
        res.status(500).json({message: "Internal Server Error"});
    }
    else if(err.name === "Bad Request"){
        res.status(400).json({message: "Bad Request"});
    }
    else if(err.name === "Not Found"){
        res.status(404).json(err);
    }
}

module.exports = errorHandler;