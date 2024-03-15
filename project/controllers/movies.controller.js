const MoviesService = require("../services/movies.service.js");
const pool = require("../config/db_config.js");
// const multer = require("multer");

const tableName = "movies";

class MoviesController{
    static async findAll(req, res, next){
        try{
            const result = await MoviesService.findAll(req.query);
            res.status(200).json(result);
        }
        catch(err){
            next(err);
        }
    }

    static async findSingle(req, res, next){
        try{
            const id = req.params.id;
            const result = await MoviesService.findSingle(id);
            res.status(200).json(result);
        }
        catch(err){
            next(err);
        }
    }

    static async add(req, res, next){
        try{
            const result = await MoviesService.add(req.body);
            res.status(200).json({result});
        }
        catch(err){
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const result = await MoviesService.update(req.body);
            res.status(200).json(result);
        }
        catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try{
            const result = await MoviesService.delete(req.body.id);
            res.status(200).json(result);
        }
        catch(err){
            next(err);
        }
    }

    static async upload(req, res, next){
        // console.log(req.file);
        const url = await MoviesService.upload(req.file);
        res.status(201).json(url);
    }
}

module.exports = MoviesController;
