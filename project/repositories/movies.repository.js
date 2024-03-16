const pool = require("../config/db_config.js");
const utils = require("../utils/utils.js");

const tableName = "movies"

class MoviesController{
    static async findAll(params){
        try{
            const pagination = await utils.pagination(params.page, params.limit, tableName);

            let sqlQuery = `SELECT * FROM ${tableName}
            ${pagination.query}`;

            const result = await pool.query(sqlQuery);

            const queryCount = `SELECT * FROM ${tableName}`;

            const totalData = (await pool.query(queryCount)).rowCount;
            if(totalData == 0) throw {name: "noDataFound", message: `There is no movie data found with current specific parameters`}; 
            return {data: result.rows,
                    pagination,
                    totalData};
        }catch(err){
            throw err;
        }
    }

    static async findSingle(id){
        try{
            let sqlQuery = `SELECT * FROM ${tableName}
                            WHERE id=${id}`;
            const result = await pool.query(sqlQuery);
            if(result.rowCount == 0) throw {name: "noDataFound", message: `There is no movie with id ${id}`};    
            return result.rows;
        }catch(err){
            throw err;
        }
    }

    static async add(params){
        try {
            const query = `
            INSERT INTO ${tableName}(title, genres, year, photo)
            VALUES($1, $2, $3, $4)
            RETURNING *
        `
        const result = await pool.query(query, [params.title, params.genres, params.year, params.photo]);
        return result.rows;
        } catch (error) {
            throw err;
        }
    }

    static async update(params_){
        try{
            const findQuery = `SELECT * FROM ${tableName} WHERE id=$1`;
            let result = await pool.query(findQuery, [params_.id]);
            if(result.rowCount == 0) throw {name: "notFound", message: `data with id ${params_.id} is not available`};
    
    
            let query = `UPDATE ${tableName} SET `
            let params = []
            let i = 1;
    
            Object.keys(params_).forEach(key => {
                query += `${key}=$${i++},`
                params.push(params_[key]);
            })
    
            query = query.slice(0, -1); //remove the last comma
            query += `\nWHERE id = $${i} RETURNING *`;
            params.push(params_.id)
    
            result = await pool.query(query, params);
    
            return result.rows;
        } catch(error){
            throw error;
        }
    }

    static async delete(id){
        try {
            const findQuery = `SELECT * FROM ${tableName} WHERE id=$1`;
            let result = await pool.query(findQuery, [id]);
            if(result.rowCount == 0) throw {name: "notFound", message: `data with id ${id} is not available`};

            let query = `DELETE FROM ${tableName} WHERE id=$1 RETURNING *`;
            result = await pool.query(query, [id]);

            return result.rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MoviesController;