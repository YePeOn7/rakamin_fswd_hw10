const pool = require("../config/db_config.js");

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

async function pagination(page_, limit_, tableName){
    try{
        const page = +page_ || DEFAULT_PAGE;
        const limit = +limit_ || DEFAULT_LIMIT;
    
        const sqlCount = `SELECT * FROM ${tableName}`;
        
        const result = await pool.query(sqlCount);
        
        const rows = result.rowCount
        const totalPage = Math.ceil(rows/limit)

        // console.log(`page ${page}, limit ${limit}, rows: ${rows}, totalPage: ${totalPage}`);
        
        return {
            query: `LIMIT ${limit} OFFSET ${(page -1) * limit}`,
            pageInfo: {
                currentPage: page,
                nextPage: page < totalPage && page > 0 ? page+1 : null, 
                previousPage: page > 1 && page <= totalPage ? page -1 : null,
                totalPage: totalPage
            }
        };
    }
    catch(err){
        console.log("Pagination get Error");
        console.log(err);
        throw err;
    }
}

module.exports = {pagination};