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

    static async add(bodyParams){
        try {
            if(!bodyParams.title || !bodyParams.genres || !bodyParams.year || !bodyParams.photo ) throw {name: "badRequest", message: "Bad Request for Adding the Movie"};

            let params = {
                title: bodyParams.title,
                genres: bodyParams.genres,
                year: bodyParams.year,
                photo: bodyParams.photo
            }
            const data = await MoviesRepository.add(params);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async update(bodyParams){
        try {
            if(!(Object.keys(bodyParams).length >= 2 && bodyParams.id)) throw {name: "badRequest", message: "Bad Request for Updating the Movie"}

            const result = await MoviesRepository.update(bodyParams);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id){
        try {
            if(!id) throw {name: "badRequest", message: "Bad Request for Deleting the Movie"}
            // console.log(id, "<<<");
            const result = await MoviesRepository.delete(id);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async upload(file){
        try {
            const url = `${process.env.BASE_URL}/api/images/${file.filename}`
            return {
                url
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MoviesService;