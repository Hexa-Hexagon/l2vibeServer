require('dotenv').config();
const { sign } = require('../middlewares/sign_and_verify_jwt');
const crypto = require('crypto');


const salt = process.env.SALT;
const adminPassword = process.env.ADMIN_PASSWORD;
class CustomError {
    constructor(type = "Error", message = "Error", code = 500) {
        this.type = type;
        this.message = message;
        this.code = code;
    }
}

module.exports.login = (request, response) => {
    try {
        const { password } = request.body;
        const hash = Buffer.from(crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512')).toString('hex');
        if (hash !== adminPassword) {
            throw new CustomError("Error", "Password is incorrect", 401);
        }
        response.status(200).send({ token: sign(response) });
    } catch (error) {
        response.status(error.code).send({ type: error.type, msg: error.message });
    }
}