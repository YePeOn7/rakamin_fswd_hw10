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
            return result.rows;
        }catch(err){
            throw err;
        }
    }

}

module.exports = MoviesController;