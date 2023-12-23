require('dotenv').config();
const { sign } = require('../middlewares/sign_and_verify_jwt');


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
        if (password !== process.env.ADMIN_PASSWORD) {
            throw new CustomError("Error", "Password is incorrect", 401);
        }
        response.status(200).send({ token: sign(response) });
    } catch (error) {
        response.status(error.code).send({ type: error.type, msg: error.message });
    }
}