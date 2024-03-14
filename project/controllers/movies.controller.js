const MoviesService = require("../services/movies.services.js");
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
            if(!req.body.title | !req.body.genres | !req.body.year) throw {name: "Bad Request"}

            const id = req.params.id;

            const query = `
                INSERT INTO ${tableName}(title, genres, year)
                VALUES($1, $2, $3)
                RETURNING *
            `

            const result = await pool.query(query, [req.body.title, req.body.genres, req.body.year]);
            
            res.status(200).json({data: result.rows});
        }
        catch(err){
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            if(!(Object.keys(req.body).length >= 2 && req.body.id)) throw {name: "Bad Request"}

            const findQuery = `SELECT * FROM ${tableName} WHERE id=$1`;
            let result = await pool.query(findQuery, [req.body.id]);
            if(result.rowCount == 0) throw {name: "Not Found", message: `data with id ${id} is not available`};


            let query = `UPDATE ${tableName} SET `
            let params = []
            let i = 1;

            Object.keys(req.body).forEach(key => {
                query += `${key}=$${i++},`
                params.push(req.body[key]);
            })

            query = query.slice(0, -1); //remove the last comma
            query += `\nWHERE id = $${i} RETURNING *`;
            params.push(req.body.id)

            // console.log(query, params);

            result = await pool.query(query, params);
            
            res.status(200).json({data: result.rows});
        }
        catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try{
            if(!req.body.id) throw {name: "Bad Request"};

            const findQuery = `SELECT * FROM ${tableName} WHERE id=$1`;
            let result = await pool.query(findQuery, [req.body.id]);
            if(result.rowCount == 0) throw {name: "Not Found", message: `data with id ${req.body.id} is not available`};

            let query = `DELETE FROM ${tableName} WHERE id=$1 RETURNING *`;
            result = await pool.query(query, [req.body.id]);

            res.status(200).json(result.rows);
        }
        catch(err){
            next(err);
        }
    }

    static async upload(req, res, next){
        console.log(req.file);
        res.status(200).send("File uploaded successfully");
    }
}

module.exports = MoviesController;
