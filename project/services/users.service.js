const UsersRepository = require("../repositories/users.repository.js");
const bcrypt = require("../libs/bcrypt.js");

class UsersService{
    static async findAll(queryParam){
        try{
            let param = {
                limit: queryParam.limit,
                page: queryParam.page,
            }

            const result = await UsersRepository.findAll(param);

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
            const data = await UsersRepository.findSingle(id);
            return {
                data
            };
        } catch(err){
            throw err;
        }
    }

    static async add(bodyParams){
        try {
            if(!bodyParams.email || !bodyParams.gender || !bodyParams.password || !bodyParams.role ) throw {name: "badRequest", message: "Bad Request for Adding the User"};

            // let params = {
            //     title: bodyParams.title,
            //     genres: bodyParams.genres,
            //     year: bodyParams.year,
            //     photo: bodyParams.photo
            // }
            bodyParams.password = bcrypt.hashPassword(bodyParams.password);
            console.log(bodyParams);
            const data = await UsersRepository.add(bodyParams);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async update(bodyParams){
        try {
            if(!(Object.keys(bodyParams).length >= 2 && bodyParams.id)) throw {name: "badRequest", message: "Bad Request for Updating the User"}

            if(bodyParams.password) bodyParams.password = bcrypt.hashPassword(bodyParams.password);
            const result = await UsersRepository.update(bodyParams);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id){
        try {
            if(!id) throw {name: "badRequest", message: "Bad Request for Deleting the User"}
            // console.log(id, "<<<");
            const result = await UsersRepository.delete(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UsersService;