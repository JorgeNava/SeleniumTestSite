const Users = require('../models/UsersModel')
const bcrypt = require('bcryptjs');
const auth = require('../helpers/jwt.js')

async function login( username, password ) {
    const user = await Users.findOne({ username });
    if (user) {
        if(bcrypt.compareSync(password, user.password)){
            const token = auth.generateAccessToken(username);
            return {...user.toJSON(), token}
        }
    } else {
        throw "Error in User Setices login";
    }
}

async function register(params){
    const user = new Users(params)
    await user.save();
}

async function getOneById(id) {
    
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const user = await Users.findById(id);
        return user.toJSON()
    }
    return "[ERROR] UserService - getById"
}

async function getOneByEmail(email) {
    if (String(email)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
        const user = await Users.findOne({ email: email });
        return user.toJSON()
    }
    return "[ERROR] UserService - getByEmail"
}

module.exports = {
    login,
    register,
    getOneById,
    getOneByEmail
};