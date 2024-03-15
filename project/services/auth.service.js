const AuthRepository = require("../repositories/auth.repository.js");
const bcrypt = require("../libs/bcrypt.js");
const jwt = require("../libs/jwt.js");

class AuthService{
     static async register(bodyParams){
        try {
            if(!bodyParams.email || !bodyParams.gender || !bodyParams.password || !bodyParams.role ) throw {name: "badRequest", message: "Bad Request for Adding the User"};

            bodyParams.password = bcrypt.hashPassword(bodyParams.password);
            console.log(bodyParams);
            const data = await AuthRepository.register(bodyParams);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async login(bodyParams){
        try {
            const email = bodyParams.email;
            const password = bodyParams.password;

            let user = await AuthRepository.findUserByEmail(email);

            if(bcrypt.comparePassword(password, user.password)){
                const accessToken = jwt.generateToken({
                    id: user.id,
                    email: user.email,
                    role: user.role,
                });

                res.status(200).json({
                    message: "Login succesfully",
                    accessToken
                });
            }
            else{
                throw {name: "unauthenticated", message: "Invalid Credential"};
            }
            
        } catch (error) {
            throw error;
        }
    }

    static async delete(id){
        try {
            if(!id) throw {name: "badRequest", message: "Bad Request for Deleting the User"}
            // console.log(id, "<<<");
            const result = await AuthRepository.delete(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthService;