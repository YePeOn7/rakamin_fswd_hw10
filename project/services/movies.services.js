const MoviesRepository = require("../repositories/movies.repository.js");



class MoviesService{
    static async findAll(queryParam){
        try{
            let param = {
                limit: queryParam.limit,
                page: queryParam.page,
            }

            const result = await MoviesRepository.findAll(param);

            const data = result.data;
            const pageInfo = {
                totalData: result.totalData,
                ...result.pagination.pageInfo
            };

            return {
                data,
                pageInfo
            };
        } catch(err){
            throw err;
        }
    }

    static async findSingle(id){
        try{
            
            const data = await MoviesRepository.findSingle(id);
            return {
                data
            };
        } catch(err){
            throw err;
        }
    }
}

module.exports = MoviesService;