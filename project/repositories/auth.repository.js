const pool = require("../config/db_config.js");
const utils = require("../utils/utils.js");

const tableName = "users"

class AuthRepository{
    static async register(params){
        try {
            const query = `
            INSERT INTO ${tableName}(email, gender, password, role)
            VALUES($1, $2, $3, $4)
            RETURNING *
        `
        const result = await pool.query(query, [params.email, params.gender, params.password, params.role]);
        return result.rows;
        } catch (error) {
            throw err;
        }
    }

    static async findUserByEmail(email){
        try{
            let sqlQuery = `SELECT * FROM ${tableName}
                            WHERE email=${email}`;
            const result = await pool.query(sqlQuery);
            if(result.rowCount == 0) throw {name: "unauthenticated", message: `There is no registered user with email ${email}`};    
            return result.rows[0];
        }catch(err){
            throw err;
        }
    }
}

module.exports = AuthRepository;