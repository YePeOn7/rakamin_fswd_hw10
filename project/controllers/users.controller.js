const UsersService = require("../services/users.service.js");
const pool = require("../config/db_config.js");


class UsersController{
    static async findAll(req, res, next){
        try{
            const result = await UsersService.findAll(req.query);
            res.status(200).json(result);
        }
        catch(err){
            next(err);
        }
    }

    static async findSingle(req, res, next){
        try{
            const id = req.params.id;
            const result = await UsersService.findSingle(id);
            res.status(200).json(result);
        }
        catch(err){
            next(err);
        }
    }

    static async add(req, res, next){
        try{
            const result = await UsersService.add(req.body);
            res.status(200).json({result});
        }
        catch(err){
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const result = await UsersService.update(req.body);
            res.status(200).json(result);
        }
        catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try{
            const result = await UsersService.delete(req.body.id);
            res.status(200).json(result);
        }
        catch(err){
            next(err);
        }
    }

    static async upload(req, res, next){
        // console.log(req.file);
        const url = await UsersService.upload(req.file);
        res.status(201).json(url);
    }
}

module.exports = UsersController;
