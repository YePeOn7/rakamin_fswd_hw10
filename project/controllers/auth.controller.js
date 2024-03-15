const pool = require("../config/db_config.js")
const jwt = require("../libs/jwt.js");
const bcrypt = require("../libs/bcrypt.js")
const express = require("express");
const AuthService = require("../services/auth.service.js");

class AuthController{
     static async register(req, res, next){
        try{
            const result = await AuthService.register(req.body);
            res.status(201).json(result);
        }
        catch(err){
            next(err)
        }
     }

     static async login(req, res, next){
        try {
            const result = await AuthService.login(req.body);
            res.status(200).json(result);
        } 
        catch (error) {
            console.log("Error on AuthController!!");
            next(error);
        }
        
     }
}

module.exports = AuthController;