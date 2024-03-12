const utils = require("../utils/utils.js");
const tableName = "users";
const pool = require("../config/db_config.js");

class UsersController{
    static async findAll(req, res, next){
        try{
            const pagination = await utils.pagination(req.query, tableName);
            const result = await pool.query(`
                SELECT * FROM ${tableName}
                ${pagination.query}
            `);

            res.status(200).json({
                data: result.rows,
                pageInfo: pagination.pageInfo
            });
        }
        catch(err){
            next(err);
        }
    }

    static async findSingle(req, res, next){
        try{
            const id = req.params.id;
            const result = await pool.query(`
                SELECT * FROM ${tableName}
                WHERE id = ${id}
            `);
            res.status(200).json({data: result.rows});
        }
        catch(err){
            next(err);
        }
    }

    static async add(req, res, next){
        try{
            if(!req.body.email || !req.body.gender || !req.body.password || !req.body.role) throw {name: "Bad Request"};

            const id = req.params.id;

            const query = `
                INSERT INTO ${tableName}(email, gender, password, role)
                VALUES($1, $2, $3, $4)
                RETURNING *
            `

            const result = await pool.query(query, [req.body.email, req.body.gender, req.body.password, req.body.role]);
            
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
}

module.exports = UsersController;
